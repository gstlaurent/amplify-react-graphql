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
                        {(article) => (
                            <div key={article.id}>
                                <Card
                                    variation="elevated"
                                    minWidth="125px"
                                    width="125px"
                                    height="95%">
                                    <Flex direction="column" justifyContent="space-between" height="100%">
                                        <Flex direction="column" justifyContent="flex-start" gap="0">
                                            <Text as="span">{article.seasons.map(s => s.emoji)}</Text>
                                            <Image
                                                src={article.imageUrl}
                                                alt={article.usage.label}
                                            />
                                        </Flex>
                                        <Button
                                            variation="link"
                                            size="small"
                                            title={`Delete ${usage.label} Article`}
                                            onClick={() => deleteArticleFromWardrobe(article)}>
                                            ❌
                                        </Button>
                                    </Flex>
                                </Card>
                            </div>
                        )}
                    </Collection>
                </ExpanderItem>
            ))
            }
        </Expander >
    );
};


export default WardrobeContents;