import { useState, } from "react";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  View,
} from '@aws-amplify/ui-react';
import { SeasonGroup } from "./season";
import { UsageRadioGroup } from "./usage";
import { createArticle, fetchArticles, deleteArticle } from "./api";
import React from "react";
import './styles.css';


export const Wardrobe = ({ articles, setArticles }) => {

  const [selectedImage, setSelectedImage] = useState(null);

  const onImageSelected = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const submitForm = async (event) => {
    await createArticle(event);
    setArticles(await fetchArticles());
    event.target.reset();
    setSelectedImage(null);
  };

  const deleteArticleFromWardrobe = (articleToDelete) => {
    const newArticles = articles.filter((article) => article.id !== articleToDelete.id);
    setArticles(newArticles);
    deleteArticle(articleToDelete)
  };

  return (
    <div>
      <View as="form" onSubmit={submitForm}>
        <Flex
          direction="column"
          alignItems="center">
          <Image
            className="new-article-image"
            src={selectedImage ?? "logoyorkshirehanger-md.png"}
            alt={"Preview Image"}
            height="200px"
            objectFit="initial"

          />
          <View
            name="image"
            as="input"
            type="file"
            accept="image/*"
            onChange={onImageSelected}
            required
          />
          <Flex direction="row" justifyContent="center">
            <SeasonGroup />
            <UsageRadioGroup />
          </Flex>
          <Button type="submit" variation="primary">
            Create Article
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Clothing</Heading>
      <View margin="3rem 0">
        {articles && articles.map((article) => (
          <Flex
            key={article.id}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="span"><strong>Seasons: </strong>{article.seasons.map(s => s.label).join(", ")}</Text>
            <Text as="span"><strong>Usage: </strong>{article.usage.label}</Text>
            <Image
              src={article.imageUrl}
              alt={article.usage.label}
              style={{ width: 400 }}
            />
            <Button variation="link" onClick={() => deleteArticleFromWardrobe(article)}>
              Delete item
            </Button>
          </Flex>
        ))}
      </View>
    </div >
  );
};
