import { useState, } from "react";
import {
    Button,
    Flex,
    Image,
    Text,
    View,
} from '@aws-amplify/ui-react';
import { SeasonGroup } from "./season";
import { UsageRadioGroup } from "./usage";
import { createArticle, fetchArticles, deleteArticle } from "./api";
import React from "react";
import './styles.css';



const WardrobeContents = ({ articles, setArticles }) => {
    const deleteArticleFromWardrobe = (articleToDelete) => {
        const newArticles = articles.filter((article) => article.id !== articleToDelete.id);
        setArticles(newArticles);
        deleteArticle(articleToDelete)
    };


    return (
        <View margin="3rem 0">
            {articles && articles.map((article) => (
                <Flex
                    key={article.id}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text as="span"><strong>Seasons: </strong>{article.seasons.map(s => s.label).join(", ")}</Text>
                    <Text as="span"><strong>Usage: </strong>{article.usage.label}</Text>
                    <Image
                        src={article.imageUrl}
                        alt={article.usage.label}
                        style={{ width: 400 }}
                    />
                    <Button variation="link" onClick={() => deleteArticleFromWardrobe(article)}>
                        Delete item
                    </Button>
                </Flex>
            ))}
        </View>
    );
};


export default WardrobeContents;