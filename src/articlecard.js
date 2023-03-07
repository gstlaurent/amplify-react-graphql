import { useState } from "react";
import {
    Button,
    Flex,
    Image,
    ToggleButton,
    ToggleButtonGroup,
    Card,
} from '@aws-amplify/ui-react';
import { deleteArticle } from "./api";
import './styles.css';
import { SEASONS } from "./season";


const deleteArticleFromWardrobe = (articleToDelete, articles, setArticles) => {
    const newArticles = articles.filter((article) => article.id !== articleToDelete.id);
    setArticles(newArticles);
    deleteArticle(articleToDelete)
};


const ArticleCard = ({ article, articles, setArticles }) => {
    const [seasons, setSeasons] = useState(article.seasons);
    return (
        <div key={article.id}>
            <Card variation="elevated" minWidth="125px" width="125px" height="95%">
                <Flex direction="column" justifyContent="space-between" height="100%">
                    <Flex direction="column" justifyContent="flex-start" gap="0">
                        <ToggleButtonGroup
                            className="article-card-season-group"
                            alignItems="flex-start"
                            size="small"
                            value={seasons}
                            onChange={(value) => setSeasons(value)}
                        >
                            {SEASONS.map((season) => (
                                <ToggleButton
                                    className="article-card-season"
                                    key={season}
                                    value={season}
                                    title={season.label}
                                >
                                    {season.emoji}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
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