import { useState, useEffect } from "react";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  View,
} from '@aws-amplify/ui-react';
import { listArticles } from "./graphql/queries";
import {
  createArticle as createArticleMutation,
  deleteArticle as deleteArticleMutation,
} from "./graphql/mutations";
import { SeasonGroup } from "./season";
import { UsageRadioGroup } from "./usage";
import md5 from "md5";


export const Wardrobe = () => {

  const [articles, setArticles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const apiData = await API.graphql({ query: listArticles, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const articlesFromAPI = apiData.data.listArticles.items;
    await Promise.all(
      articlesFromAPI.map(async (article) => {
        if (article.image) {
          const url = await Storage.vault.get(article.image);
          article.image = url;
        }
        return article;
      })
    );
    setArticles(articlesFromAPI);
  }

  async function generateImageName(image) {
    console.log(md5("bobcat"));
    const hash = md5(await image.arrayBuffer());
    const extension = image.name.split(".").at(-1);
    return `${hash}-${Date.now()}.${extension}`;
  };

  async function createArticle(event) {
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
    fetchArticles();
    event.target.reset();
    setSelectedImage(null);
  }

  async function deleteArticle({ id, name }) {
    const newArticles = articles.filter((article) => article.id !== id);
    setArticles(newArticles);
    await Storage.vault.remove(name);
    await API.graphql({
      query: deleteArticleMutation,
      variables: { input: { id } },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
  }

  const onImageSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <div>
      <View as="form" margin="3rem 0" onSubmit={createArticle}>
        <Button type="submit" variation="primary">
          Create Article
        </Button>
        <Flex direction="row" justifyContent="center">
          <SeasonGroup />
          <UsageRadioGroup />
        </Flex>
        <View
          name="image"
          as="input"
          type="file"
          accept="image/*"
          style={{ alignSelf: "center" }}
          onChange={onImageSelected}
          required
        />
        {selectedImage && (
          <div>
            <Image
              src={selectedImage}
              alt={"Preview Image"}
              style={{ width: 400 }}
            />
          </div>
        )}
      </View>
      <Heading level={2}>Current Clothing</Heading>
      <View margin="3rem 0">
        {articles.map((article) => (
          <Flex
            key={article.id || article.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {article.name}
            </Text>
            <Text as="span">{article.description}</Text>
            <Text as="span"><strong>Seasons: </strong>{article.seasons.join(", ")}</Text>
            <Text as="span"><strong>Usage: </strong>{article.usage}</Text>

            {article.image && (
              <Image
                src={article.image}
                alt={`visual aid for ${articles.name}`}
                style={{ width: 400 }}
              />
            )}
            <Button variation="link" onClick={() => deleteArticle(article)}>
              Delete item
            </Button>
          </Flex>
        ))}
      </View>
    </div>
  );
};
