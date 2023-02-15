import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Tabs,
  TabItem,
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
      <Tabs defaultIndex={0}
        style={{ display: "block" }}
      >
        <TabItem title="Outfit">
          <Outfit articles={articles} />
        </TabItem>
        <TabItem title="Wardrobe">
          <Wardrobe articles={articles} setArticles={setArticles} />
        </TabItem>
      </Tabs>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);

