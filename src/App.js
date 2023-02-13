import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Heading,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { Wardrobe } from './wardrobe';


const App = ({ signOut }) => {
  return (
    <View className="App">
      <Heading level={1}>My Clothing App</Heading>
      <Wardrobe />
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
