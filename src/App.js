import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { listArticles } from "./graphql/queries";
import {
  createArticle as createArticleMutation,
  deleteArticle as deleteArticleMutation,
} from "./graphql/mutations";
import { SEASONS } from "./season";
import { USAGES } from "./usage";

const App = ({ signOut }) => {
  const [articles, setArticles] = useState([]);

  const [seasons, setSeasons] = useState(
    new Array(SEASONS.length).fill(false)
  );

  const [usages, setUsages] = useState(
    new Array(USAGES.length).fill(false)
  );

  const handleOnChange = (checkboxes, setCheckboxes, position) => {
    const updatedCheckboxes = checkboxes.map((item, index) =>
      index === position ? !item : item
    );
    setCheckboxes(updatedCheckboxes);
  };

  const getGraphqlEnums = (checkboxes, enumtypes) => {
    return enumtypes
      .map((enumtype) => enumtype.graphqlEnum)
      .filter((_, i) => checkboxes[i]);
  };

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

  async function createArticle(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      image: image.name,
      seasons: getGraphqlEnums(seasons, SEASONS),
      usage: getGraphqlEnums(usages, USAGES)[0]
    };
    if (!!data.image) await Storage.vault.put(data.image, image);
    await API.graphql({
      query: createArticleMutation,
      variables: { input: data },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchArticles();
    event.target.reset();
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

  return (
    <View className="App">
      <Heading level={1}>My Articles App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createArticle}>
        <Flex direction="row" justifyContent="center">
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          />
          <Button type="submit" variation="primary">
            Create Article
          </Button>
          <h4>Seasons</h4>
          <ul className="seasons-list">
            {SEASONS.map(({ label, _ }, index) => {
              return (
                <li key={label}>
                  <div className="seasons-list-item">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${label}`}
                      name={label}
                      value={label}
                      checked={seasons[index]}
                      onChange={() => handleOnChange(seasons, setSeasons, index)}
                    />
                    <label htmlFor={`custom-checkbox-${label}`}>{label}</label>
                  </div>
                </li>
              );
            })}
          </ul>

          <h4>Usage</h4>
          <ul className="seasons-list">
            {USAGES.map(({ label, _ }, index) => {
              return (
                <li key={label}>
                  <div className="seasons-list-item">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${label}`}
                      name={label}
                      value={label}
                      checked={usages[index]}
                      onChange={() => handleOnChange(usages, setUsages, index)}
                    />
                    <label htmlFor={`custom-checkbox-${label}`}>{label}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </Flex>
      </View>
      <Heading level={2}>Current Articles</Heading>
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
              Delete article
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
