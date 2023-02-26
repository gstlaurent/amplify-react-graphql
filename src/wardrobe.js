import { useState, } from "react";
import {
  Button,
  Flex,
  Heading,
  Image,
  View,
} from '@aws-amplify/ui-react';
import { SeasonGroup } from "./season";
import { UsageRadioGroup } from "./usage";
import WardrobeContents from "./wardrobecontents";
import { createArticle, fetchArticles } from "./api";
import './styles.css';


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

  return (
    <div>
      <View as="form" onSubmit={submitForm}>
        <Flex
          direction="column"
          alignItems="center">
          <Image
            className="new-article-image"
            src={selectedImage ?? "coathanger.png"}
            alt={"Preview Image"}
            height="200px"
            objectFit="scale-down"

          />
          <View
            name="image"
            as="input"
            type="file"
            accept="image/*"
            onChange={onImageSelected}
            required
          />
          <Flex direction="row" justifyContent="center">
            <SeasonGroup />
            <UsageRadioGroup />
          </Flex>
          <Button type="submit" variation="primary">
            Create Article
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Clothing</Heading>
      <WardrobeContents articles={articles} setArticles={setArticles} />
    </div >
  );
};
