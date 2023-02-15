import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Tabs,
  TabItem,
  Flex,
  Heading,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { Wardrobe } from './wardrobe';
import { fetchArticles } from "./api";
import { Outfit } from "./outfit";

const App = ({ signOut }) => {

  const [articles, setArticles] = useState(null);

  useEffect(() => {
    (async function () {
      setArticles(await fetchArticles());
    })();
  }, []);


  return (
    <View className="App">
      <Heading level={1}>My Clothing App</Heading>
      <Flex
        direction="row"
        wrap="nowrap"
        justifyContent="space-between"
      >
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
      <Tabs defaultIndex={0}>
        <TabItem title="Outfit">
          <Outfit articles={articles} />
        </TabItem>
        <TabItem title="Wardrobe">
          <Wardrobe articles={articles} setArticles={setArticles} />
        </TabItem>
      </Tabs>
    </View>
  );
};

export default withAuthenticator(App);

