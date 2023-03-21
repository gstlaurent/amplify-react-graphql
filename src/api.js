import {
    articleTestsByOwnerAndCreatedAt as articlesByOwnerAndCreatedAt,
} from "./graphql/queries";
import { Season } from "./season";
import md5 from "md5";
import { API, Storage, Auth } from 'aws-amplify';
import {
    createArticleTest as createArticleMutation,
    deleteArticleTest as deleteArticleMutation,
    createOutfitTest as createOutfitMutation,
    createOutfitTestArticleTest,
} from "./graphql/mutations";
import { outfitTestsWithArticleTestsByOwnerAndCreatedAt } from "./graphql/mygql";
import { Usage } from "./usage";
import { compressImage } from "./util";


export const fetchArticles = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    const variables = {
        limit: 10000,
        owner: `${currentUser.attributes.sub}::${currentUser.username}`
    };
    const apiData = await API.graphql({
        query: articlesByOwnerAndCreatedAt,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        variables
    });
    if (apiData.data.articleTestsByOwnerAndCreatedAt.nextToken) {
        console.error(`Only fetched first ${variables.limit} articles. Some left unfetched.`);
    }
    const articlesFromAPI = apiData.data.articleTestsByOwnerAndCreatedAt.items;
    await Promise.all(
        articlesFromAPI.map(async (article) => {
            const url = await Storage.vault.get(article.image);
            article.imageUrl = url;
            article.usage = Usage[article.usage];
            article.seasons = article.seasons.map((season) => Season[season]);
            return article;
        })
    );
    return articlesFromAPI;
}

const generateImageName = async (image) => {
    const data = await image.text();
    const hash = md5(data);
    const extension = image.name.split(".").at(-1);
    return `${hash}-${Date.now()}.${extension}`;
};

export const createArticle = async (imageFile, seasons, usage) => {
    const compressedImageFile = await compressImage(imageFile);
    const data = {
        image: await generateImageName(compressedImageFile),
        seasons: seasons,
        usage: usage
    };
    await Storage.vault.put(data.image, compressedImageFile);
    const newArticleData = await API.graphql({
        query: createArticleMutation,
        variables: { input: data },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    const newArticle = newArticleData.data.createArticleTest;
    newArticle.usage = Usage[newArticle.usage];
    newArticle.seasons = newArticle.seasons.map((season) => Season[season]);
    newArticle.imageUrl = await Storage.vault.get(newArticle.image);
    return newArticle;
}

export const deleteArticle = async ({ id, image }) => {
    await Storage.vault.remove(image);
    await API.graphql({
        query: deleteArticleMutation,
        variables: { input: { id } },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
}

export const createOutfit = async ({ season, articles }) => {
    const outfitData = { season: season.graphqlEnum };
    const newOutfitData = await API.graphql({
        query: createOutfitMutation,
        variables: { input: outfitData },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    const newOutfit = newOutfitData.data.createOutfitTest;
    for (const article of articles) {
        const joinData = {
            articleTestId: article.id,
            outfitTestId: newOutfit.id,
        };
        await API.graphql({
            query: createOutfitTestArticleTest,
            variables: { input: joinData },
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
    }
}

export const fetchLastOutfit = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    const variables = {
        limit: 1,
        owner: `${currentUser.attributes.sub}::${currentUser.username}`,
        sortDirection: "DESC",
    };
    const apiData = await API.graphql({
        query: outfitTestsWithArticleTestsByOwnerAndCreatedAt,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        variables
    });
    const lastOutfit = apiData.data.outfitTestsByOwnerAndCreatedAt.items?.[0];
    if (!lastOutfit) {
        return null;
    }
    lastOutfit.season = Season[lastOutfit.season];
    lastOutfit.articles = lastOutfit.articles.items.map(art => art.articleTest);
    await Promise.all(
        lastOutfit.articles.map(async (article) => {
            const url = await Storage.vault.get(article.image);
            article.imageUrl = url;
            article.usage = Usage[article.usage];
            article.seasons = article.seasons.map((season) => Season[season]);
            return article;
        })
    );
    return lastOutfit;
}