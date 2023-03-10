import React from "react";
import {
    Button,
    Flex,
    Image,
    Text,
    Card,
} from '@aws-amplify/ui-react';
import { deleteArticle } from "./api";
import './styles.css';

const deleteArticleFromWardrobe = (articleToDelete, articles, setArticles) => {
    const newArticles = articles.filter((article) => article.id !== articleToDelete.id);
    setArticles(newArticles);
    deleteArticle(articleToDelete)
};


const ArticleCard = ({ article, articles, setArticles }) => {
    return (
        <div key={article.id}>
            <Card variation="elevated" minWidth="125px" width="125px" height="95%">
                <Flex direction="column" justifyContent="space-between" height="100%">
                    <Flex direction="column" justifyContent="flex-start" gap="0">
                        <Text as="span">{article.seasons.map(s => s.emoji)}</Text>
                        <Image src={article.imageUrl} alt={article.usage.label} />
                    </Flex>
                    <Button variation="link" size="small" title={`Delete ${article.usage.label} Article`} onClick={() => {
                        if (window.confirm(`Are you sure you want to delete this ${article.usage.label}?`)) {
                            deleteArticleFromWardrobe(article, articles, setArticles);
                        }
                    }}>
                        ❌
                    </Button>
                </Flex>
            </Card>
        </div>
    )
}

export default ArticleCard;