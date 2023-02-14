import { useState, useEffect } from "react";
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


export const Wardrobe = () => {

  const [articles, setArticles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async function () {
      setArticles(await fetchArticles());
    })();
  }, []);

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
                alt={`visual aid for a ${article.usage}`}
                style={{ width: 400 }}
              />
            )}
            <Button variation="link" onClick={() => deleteArticle(article, articles, setArticles)}>
              Delete item
            </Button>
          </Flex>
        ))}
      </View>
    </div >
  );
};
