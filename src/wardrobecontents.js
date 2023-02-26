import React from "react";
import {
    Button,
    Collection,
    Flex,
    Image,
    Text,
    Card,
} from '@aws-amplify/ui-react';
import { USAGES } from "./usage";
import { deleteArticle } from "./api";
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
                    <Collection
                        items={articlesByUsage?.[usage]}
                        type="list"
                        direction="row"
                        wrap="nowrap"
                        overflow="auto"
                    >
                        {(article, index) => (
                            <Card variation="elevated" width="45%">
                                <Flex
                                    key={article.id}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Text as="span">{article.seasons.map(s => s.emoji)}</Text>
                                    <Image
                                        src={article.imageUrl}
                                        alt={article.usage.label}
                                        objectFit="scale-down"
                                    />
                                    <Button variation="link" onClick={() => deleteArticleFromWardrobe(article)}>
                                        Delete item
                                    </Button>
                                </Flex>
                            </Card>
                        )}
                    </Collection>
                </ExpanderItem>
            ))}
        </Expander>
    );
};


export default WardrobeContents;