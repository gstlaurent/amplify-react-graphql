import { useState, } from "react";
import {
  Button,
  Flex,
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

  const onImageSelected = async (event) => {
    if (event.target?.files?.[0]) {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
    }
  }

  const submitForm = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const imageFile = form.get("image");
    const seasons = form.getAll("seasons");
    const usage = form.get("usage");

    event.target.reset();
    setSelectedImage(null);

    await createArticle(imageFile, seasons, usage);
    setArticles(await fetchArticles());
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
          <div className="image-selector">
            <Button variation="secondary">
              <label htmlFor="image-selection">
                📷 Select Image
              </label>
            </Button>
            <View
              className="image-input"
              id="image-selection"
              name="image"
              as="input"
              type="file"
              accept="image/*"
              onChange={onImageSelected}
              required
            />
          </div>
          <Flex direction="row" justifyContent="center">
            <SeasonGroup />
            <UsageRadioGroup />
          </Flex>
          <Button type="submit" variation="primary" className="create-button">
            Create Article
          </Button>
        </Flex>
      </View>
      <WardrobeContents articles={articles} setArticles={setArticles} />
    </div >
  );
};
