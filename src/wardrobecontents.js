import React from "react";
import {
    Collection,
    Flex,
} from '@aws-amplify/ui-react';
import { USAGES } from "./usage";
import ArticleCard from "./articlecard";
import './styles.css';
import { Expander, ExpanderItem } from '@aws-amplify/ui-react';
import { groupBy } from "./util";
import { updateArticle } from "./api";


const WardrobeContents = ({ articles, setArticles }) => {
    const articlesByUsage = groupBy(articles, "usage", USAGES);
    return (
        <Flex direction="column" alignItems="center">
            <Expander type="single" isCollapsible={true}>
                {USAGES.map((usage) => (
                    <ExpanderItem title={`${usage.emoji} ${usage.plural_label}`} value={usage} key={usage}>
                        <Collection
                            items={articlesByUsage?.[usage]}
                            type="list"
                            direction="row"
                            wrap="nowrap"
                            overflow="auto"
                        >
                            {(article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    articles={articles}
                                    setArticles={setArticles}
                                    onChange={(updatedArticle) => {
                                        // updateArticle(updatedArticle);
                                        // const newArticles = articles;
                                        // const i = newArticles.findIndex(article);
                                        // newArticles[i] = updatedArticle;
                                        // setArticles(newArticles);
                                        console.log('Updating an article:' + JSON.stringify(updatedArticle))
                                    }}
                                />
                            )}
                        </Collection>
                    </ExpanderItem>
                ))
                }
            </Expander >
        </Flex>

    );
};


export default WardrobeContents;