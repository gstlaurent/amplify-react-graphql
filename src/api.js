import { articlesByOwnerAndCreatedAt } from "./graphql/queries";
import md5 from "md5";
import { API, Storage, Auth } from 'aws-amplify';
import {
    createArticle as createArticleMutation,
    deleteArticle as deleteArticleMutation,
} from "./graphql/mutations";
import { Season } from "./season";
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
    if (apiData.data.articlesByOwnerAndCreatedAt.nextToken) {
        console.error(`Only fetched first ${variables.limit} articles. Some left unfetched.`);
    }
    const articlesFromAPI = apiData.data.articlesByOwnerAndCreatedAt.items;
    articlesFromAPI.forEach((article) => {
        article.usage = Usage[article.usage];
        article.seasons = article.seasons.map((season) => Season[season]);
    });
    await Promise.all(
        articlesFromAPI.map(async (article) => {
            const url = await Storage.vault.get(article.image);
            article.imageUrl = url;
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
    await API.graphql({
        query: deleteArticleMutation,
        variables: { input: { id } },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
}

