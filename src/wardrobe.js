import { useState, } from "react";
import {
  Button,
  Collection,
  Card,
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

  const [selectedImages, setSelectedImages] = useState([]);

  const onImagesSelected = async (event) => {
    if (event.target?.files) {
      const imageFiles = Array.from(event.target.files);
      const imageUrls = imageFiles.map(imageFile => URL.createObjectURL(imageFile));
      setSelectedImages(imageUrls);
    }
  }

  const submitForm = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const imageFile = form.get("image");
    const seasons = form.getAll("seasons");
    const usage = form.get("usage");

    event.target.reset();
    setSelectedImages([]);

    await createArticle(imageFile, seasons, usage);
    setArticles(await fetchArticles());
  };

  return (
    <div>
      <View as="form" onSubmit={submitForm}>
        <Flex
          direction="column"
          alignItems="center">
          {selectedImages.length > 0 &&
            <Collection
              items={selectedImages}
              type="list"
              direction="row"
              wrap="nowrap">
              {(image, index) => (
                <Card key={index}
                  borderRadius="medium"
                  maxWidth="20rem"
                  variation="outlined">
                  <Image
                    className="new-article-image"
                    src={image}
                    alt={"Preview Image"}
                    height="200px"
                    objectFit="scale-down"
                  />
                </Card>
              )}
            </Collection>}
          {selectedImages.length === 0 &&
            <Image
              className="new-article-image"
              src={"coathanger.png"}
              alt={"Placeholder Image"}
              height="200px"
              objectFit="scale-down"
            />}
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
              onChange={onImagesSelected}
              required
              multiple
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
