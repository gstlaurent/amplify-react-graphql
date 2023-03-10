import { useState, } from "react";
import {
  Button,
  Collection,
  Flex,
  Image,
  View,
} from '@aws-amplify/ui-react';
import { SeasonGroup } from "./season";
import { UsageRadioGroup } from "./usage";
import WardrobeContents from "./wardrobecontents";
import { createArticle } from "./api";
import './styles.css';

export const Wardrobe = ({ articles, setArticles }) => {

  const [selectedImages, setSelectedImages] = useState([]);

  const onImagesSelected = async (event) => {
    if (event.target?.files) {
      const imageFiles = Array.from(event.target.files);
      setSelectedImages(imageFiles);
    }
  }

  const submitForm = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const imageFile = selectedImages[0];
    const seasons = form.getAll("seasons");
    const usage = form.get("usage");

    if (selectedImages.length === 1) {
      event.target.reset();
    }
    setSelectedImages(selectedImages.slice(1));

    const newArticle = await createArticle(imageFile, seasons, usage);
    setArticles([...articles, newArticle]);
  };

  return (
    <div>
      <View as="form" onSubmit={submitForm}>
        <Flex
          direction="column"
          alignItems="center"
          gap="0.5em"
          justifyContent="space-around"
        >
          <div className="image-selector">
            <Button variation="secondary">
              <label htmlFor="image-selection">
                📷 Select Image(s)
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
          <div className="images">
            {selectedImages.length > 1 &&
              <Collection
                items={selectedImages.slice(1)}
                type="list"
                direction="row-reverse"
                wrap="nowrap"
                overflow="hidden"
                className="next-images"
                gap="0.25em"
              >
                {(image, index) => (
                  <Image
                    key={index}
                    className="next-preview"
                    src={URL.createObjectURL(image)}
                    alt={"Upcoming Preview Image"}
                  />
                )}
              </Collection>
            }
            {selectedImages.length <= 1 &&
              <div className="next-images">
                &nbsp;
              </div>}
            <Image
              className="preview-image new-article-image"
              src={selectedImages.length > 0 ? URL.createObjectURL(selectedImages[0]) : "coathanger.png"}
              alt={"Current Preview Image"}
            />
            <div className="spacer">
              &nbsp;
            </div>
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
