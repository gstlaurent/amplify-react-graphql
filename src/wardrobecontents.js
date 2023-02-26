import { useState, } from "react";
import {
    Button,
    Flex,
    Image,
    Text,
    View,
} from '@aws-amplify/ui-react';
import { SeasonGroup } from "./season";
import { UsageRadioGroup, USAGES } from "./usage";
import { createArticle, fetchArticles, deleteArticle } from "./api";
import React from "react";
import './styles.css';
import { Expander, ExpanderItem } from '@aws-amplify/ui-react';
import { groupBy } from "./util";

const WardrobeContents = ({ articles, setArticles }) => {
    const deleteArticleFromWardrobe = (articleToDelete) => {
        const newArticles = articles.filter((article) => article.id !== articleToDelete.id);
        setArticles(newArticles);
        deleteArticle(articleToDelete)
    };

    const articlesByUsage = groupBy(articles, "usage", USAGES);
    return (
        <Expander type="multiple">
            {USAGES.map((usage) => (
                <ExpanderItem title={usage.label} value={usage} key={usage}>
                    {articlesByUsage?.[usage].map((article) => (
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
                </ExpanderItem>
            ))}
        </Expander>
    );
};


export default WardrobeContents;