import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  ToggleButton,
  ToggleButtonGroup,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { Wardrobe } from './wardrobe';
import { fetchArticles } from "./api";
import { Outfit } from "./outfit";
import { Season, SEASONS } from "./season";

const App = ({ signOut }) => {
  const [page, setPage] = useState('outfit');
  const [currentSeason, setCurrentSeason] = useState(Season.Winter.label)//(Season.WINTER);

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
        <ToggleButtonGroup
          value={currentSeason}
          isExclusive
          isSelectionRequired
          onChange={(value) => setCurrentSeason(value)}
        >
          {SEASONS.map(({ label, emoji }) => (
            <ToggleButton value={label} title={label}>{emoji}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={page}
          isExclusive
          isSelectionRequired
          onChange={(value) => setPage(value)}
        >
          <ToggleButton value="outfit">Outfit</ToggleButton>
          <ToggleButton value="wardrobe">Wardrobe</ToggleButton>
        </ToggleButtonGroup>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
      {page === 'outfit' && <Outfit articles={articles} />}
      {page === 'wardrobe' && <Wardrobe articles={articles} setArticles={setArticles} />}

    </View>
  );
};

export default withAuthenticator(App);

