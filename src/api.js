import { listArticles } from "./graphql/queries";
import md5 from "md5";
import { API, Storage } from 'aws-amplify';
import {
    createArticle as createArticleMutation,
    deleteArticle as deleteArticleMutation,
} from "./graphql/mutations";
import { Season } from "./season";
import { Usage } from "./usage";
import { compressImage } from "./util";


export const fetchArticles = async () => {
    const variables = {
        limit: 10000,
    };
    const apiData = await API.graphql({
        query: listArticles,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        variables
    });
    if (apiData.data.listArticles.nextToken) {
        console.error(`Only fetched first ${variables.limit} articles. Some left unfetched.`);
    }
    const articlesFromAPI = apiData.data.listArticles.items;
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
    await API.graphql({
        query: createArticleMutation,
        variables: { input: data },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
}

export const deleteArticle = async ({ id, image }) => {
    await Storage.vault.remove(image);
    await API.graphql({
        query: deleteArticleMutation,
        variables: { input: { id } },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
}

