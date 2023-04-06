import {
    articlesByOwnerAndCreatedAt,
    outfitArticleJoinsByArticleId
} from "./graphql/queries";
import {
    createArticle as createArticleMutation,
    deleteArticle as deleteArticleMutation,
    createOutfit as createOutfitMutation,
    updateArticle as updateArticleMutation,
    createOutfitArticleJoin,
    deleteOutfitArticleJoin,
} from "./graphql/mutations";
import { outfitsWithArticlesByOwnerAndCreatedAt } from "./graphql/mygql";

import md5 from "md5";
import { API, Storage, Auth } from 'aws-amplify';

import { Usage } from "./usage";
import { Season } from "./season";
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
    if (apiData.data.articlesByOwnerAndCreatedAt.nextToken) {
        console.error(`Only fetched first ${variables.limit} articles. Some left unfetched.`);
    }
    const articlesFromAPI = apiData.data.articlesByOwnerAndCreatedAt.items;
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
    const newArticle = newArticleData.data.createArticle;
    newArticle.usage = Usage[newArticle.usage];
    newArticle.seasons = newArticle.seasons.map((season) => Season[season]);
    newArticle.imageUrl = await Storage.vault.get(newArticle.image);
    return newArticle;
}

export const deleteArticle = async ({ id, image }) => {
    await Storage.vault.remove(image);
    const joinRecordData = await API.graphql({
        query: outfitArticleJoinsByArticleId,
        variables: { articleId: id },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    for (const joinRecord of joinRecordData.data.outfitArticleJoinsByArticleId.items) {
        await API.graphql({
            query: deleteOutfitArticleJoin,
            variables: {
                input: {
                    id: joinRecord.id
                }
            },
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
    }
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
    const newOutfit = newOutfitData.data.createOutfit;
    for (const article of articles) {
        const joinData = {
            articleId: article.id,
            outfitId: newOutfit.id,
        };
        await API.graphql({
            query: createOutfitArticleJoin,
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
        query: outfitsWithArticlesByOwnerAndCreatedAt,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        variables
    });
    const lastOutfit = apiData.data.outfitsByOwnerAndCreatedAt.items?.[0];
    if (!lastOutfit) {
        return null;
    }
    lastOutfit.season = Season[lastOutfit.season];
    lastOutfit.articles = lastOutfit.articles.items.map(art => art.article);
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

export const updateArticle = async (updatedArticle) => {
    const data = {
        id: updatedArticle.id,
        seasons: updatedArticle.seasons.map(s => s.graphqlEnum),
        usage: updatedArticle.usage.graphqlEnum,
    };
    await API.graphql({
        query: updateArticleMutation,
        variables: { input: data },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    return updateArticle;
}