import { listArticles } from "./graphql/queries";
import md5 from "md5";
import { API, Storage } from 'aws-amplify';
import {
    createArticle as createArticleMutation,
    deleteArticle as deleteArticleMutation,
} from "./graphql/mutations";
import { Season } from "./season";
import { Usage } from "./usage";

export const fetchArticles = async () => {
    const apiData = await API.graphql({ query: listArticles, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const articlesFromAPI = apiData.data.listArticles.items;
    articlesFromAPI.forEach((article) => {
        article.usage = Usage[article.usage];
        article.seasons = article.seasons.map((season) => Season[season]);
    });
    await Promise.all(
        articlesFromAPI.map(async (article) => {
            if (article.image) {
                const url = await Storage.vault.get(article.image);
                article.imageUrl = url;
            }
            return article;
        })
    );
    return articlesFromAPI;
}

export const generateImageName = async (image) => {
    const hash = md5(await image.arrayBuffer());
    const extension = image.name.split(".").at(-1);
    return `${hash}-${Date.now()}.${extension}`;
};

export const createArticle = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
        image: await generateImageName(image),
        seasons: form.getAll("seasons"),
        usage: form.get("usage")
    };
    await Storage.vault.put(data.image, image);
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

