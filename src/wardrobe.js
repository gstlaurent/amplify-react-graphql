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
      <View as="form" margin="3rem 0" onSubmit={submitForm}>
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
        {articles && articles.map((article) => (
          <Flex
            key={article.id}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="span"><strong>Seasons: </strong>{article.seasons.join(", ")}</Text>
            <Text as="span"><strong>Usage: </strong>{article.usage}</Text>
            <Image
              src={article.imageUrl}
              alt={`visual aid for a ${article.usage}`}
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
