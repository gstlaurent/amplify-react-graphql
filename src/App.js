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
import { isBirthday } from "./util";

const App = ({ signOut }) => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    fetchArticles().then(articles => setArticles(articles));
  }, []);


  return (
    <View className="App">
      {isBirthday && (<h4 className="birthday-message">🎂🎈🥳Happy Birthday, Shelley!🥳🎈🎂</h4>)}
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
      <Button margin="1em" onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);

