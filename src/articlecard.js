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
import { Usage, USAGES } from "./usage";


const deleteArticleFromWardrobe = (articleToDelete, articles, setArticles) => {
    const newArticles = articles.filter((article) => article.id !== articleToDelete.id);
    setArticles(newArticles);
    deleteArticle(articleToDelete)
};


const ArticleCard = ({ article, articles, setArticles }) => {
    const [seasons, setSeasons] = useState(article.seasons);
    const [currentUsage, setCurrentUsage] = useState(article.usage);
    return (
        <div key={article.id}>
            <Card variation="elevated" minWidth="125px" width="125px" height="95%">
                <Flex direction="column" gap="0.5em" justifyContent="space-between" height="100%">
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
                                isFullWidth
                            >
                                {season.emoji}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <Image className="article-card-image" src={article.imageUrl} alt={article.usage.label} />
                    <Flex direction="row" justifyContent="space-between">
                        <Button variation="secondary" size="small">
                            {article.usage.emoji}
                        </Button>
                        <ToggleButtonGroup
                            className="usage-buttons"
                            size="small"
                            value={currentUsage}
                            onChange={(value) => setCurrentUsage(value)}
                            isSelectionRequired
                            isExclusive
                        >
                            {USAGES.map((usage) => (
                                <ToggleButton
                                    key={usage}
                                    value={usage}
                                    title={usage.label}
                                >
                                    {usage.emoji}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        <Button variation="link" size="small" title={`Delete ${article.usage.label} Article`} onClick={() => {
                            if (window.confirm(`Are you sure you want to delete this ${article.usage.label}?`)) {
                                deleteArticleFromWardrobe(article, articles, setArticles);
                            }
                        }}>
                            ❌
                        </Button>

                    </Flex>

                </Flex>
            </Card>
        </div >
    )
}

export default ArticleCard;