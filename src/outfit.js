import { useState } from "react"
import { groupBy, getRandomInt, sortByStringProperty } from "./util";
import {
    Image,
    Button,
    ToggleButtonGroup,
    ToggleButton,
} from '@aws-amplify/ui-react';
import { Season, SEASONS } from "./season";

export const Outfit = ({ articles }) => {
    const [randomArticles, setRandomArticles] = useState(null);
    const [currentSeason, setCurrentSeason] = useState(Season.Winter.label)//(Season.WINTER);


    const articlesByUsage = groupBy(articles, "usage");

    const generateRandomArticles = () => {
        const newRandomArticles = Object.values(articlesByUsage).map((articles) => {
            const index = getRandomInt(articles.length);
            const article = articles.at(index);
            return article;
        });
        setRandomArticles(sortByStringProperty(newRandomArticles, "usage"));
    }

    if (articlesByUsage && !randomArticles) {
        generateRandomArticles();
    }

    return (
        <div>
            <ToggleButtonGroup
                value={currentSeason}
                isExclusive
                isSelectionRequired
                onChange={(value) => setCurrentSeason(value)}
            >
                {SEASONS.map(({ label, emoji }) => (
                    <ToggleButton value={label} title={label}>{emoji}</ToggleButton>
                ))}
            </ToggleButtonGroup>
            {!randomArticles && <span>Generating Random Outfit...</span>}
            {randomArticles && (
                <div>
                    <Button
                        size="large"
                        onClick={generateRandomArticles}
                    >
                        🔄
                    </Button>
                    <div>
                        {randomArticles.map((article) => (
                            <Image
                                key={article.id}
                                src={article.imageUrl}
                                alt={article.usage}
                                title={article.usage}
                                style={{ width: 125 }}
                            />)
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}