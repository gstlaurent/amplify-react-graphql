import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Heading,
  ToggleButton,
  ToggleButtonGroup,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { Wardrobe } from './wardrobe';
import { fetchArticles } from "./api";
import { Outfit } from "./outfit";


const App = ({ signOut }) => {
  const [page, setPage] = useState('outfit');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function () {
      setArticles(await fetchArticles());
    })();
  }, []);


  return (
    <View className="App">
      <Heading level={1}>My Clothing App</Heading>
      <div className="page-toggle">
        <ToggleButtonGroup
          value={page}
          isExclusive
          onChange={(value) => setPage(value)}
        >
          <ToggleButton value="outfit">Outfit</ToggleButton>
          <ToggleButton value="wardrobe">Wardrobe</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {page === 'outfit' && <Outfit articles={articles} />}
      {page === 'wardrobe' && <Wardrobe articles={articles} setArticles={setArticles} />}
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);

