import { articleTestsByOwnerAndCreatedAt } from "./graphql/queries";
import md5 from "md5";
import { API, Storage, Auth } from 'aws-amplify';
import {
    createArticleTest as createArticleTestMutation,
    deleteArticleTest as deleteArticleTestMutation,
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
        query: articleTestsByOwnerAndCreatedAt,
        authMode: 'AMAZON_COGNITO_USER_POOLS',
        variables
    });
    if (apiData.data.articleTestsByOwnerAndCreatedAt.nextToken) {
        console.error(`Only fetched first ${variables.limit} articletests. Some left unfetched.`);
    }
    const articletestsFromAPI = apiData.data.articleTestsByOwnerAndCreatedAt.items;
    articletestsFromAPI.forEach((articletest) => {
        articletest.usage = Usage[articletest.usage];
        articletest.seasons = articletest.seasons.map((season) => Season[season]);
    });
    await Promise.all(
        articletestsFromAPI.map(async (articletest) => {
            const url = await Storage.vault.get(articletest.image);
            articletest.imageUrl = url;
            return articletest;
        })
    );
    return articletestsFromAPI;
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
    const newArticleTestData = await API.graphql({
        query: createArticleTestMutation,
        variables: { input: data },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    const newArticleTest = newArticleTestData.data.createArticleTest;
    newArticleTest.usage = Usage[newArticleTest.usage];
    newArticleTest.seasons = newArticleTest.seasons.map((season) => Season[season]);
    newArticleTest.imageUrl = await Storage.vault.get(newArticleTest.image);
    return newArticleTest;
}

export const deleteArticle = async ({ id, image }) => {
    await Storage.vault.remove(image);
    await API.graphql({
        query: deleteArticleTestMutation,
        variables: { input: { id } },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
}

