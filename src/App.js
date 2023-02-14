import { useState } from "react";

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
import React from "react";
import { Outfit } from "./outfit";


const App = ({ signOut }) => {
  const [page, setPage] = useState('outfit');

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
      {page === 'outfit' && <Outfit />}
      {page === 'wardrobe' && <Wardrobe />}
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);

