import { useEffect, useState } from "react"
import { groupBy, getRandomInt, sortByStringProperty } from "./util";
import {
    Image,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Flex,
} from '@aws-amplify/ui-react';
import { Season, SEASONS } from "./season";



const generateRandomArticles = (articlesByUsage) => {
    const randomArticles = Object.values(articlesByUsage)
        .map((usageArticles) => {
            const index = getRandomInt(usageArticles.length);
            const article = usageArticles.at(index);
            return article;
        });
    return sortByStringProperty(randomArticles, "usage")
}

const isArticleInSeason = (article, currentSeason) => {
    return article.seasons.includes(currentSeason);
};

const groupSeasonalArticlesByUsage = (season, articles) => {
    if (!articles) {
        return {};
    }
    const seasonalArticles = articles.filter((a) => isArticleInSeason(a, season));
    return groupBy(seasonalArticles, "usage");
};


export const Outfit = ({ articles }) => {
    const [currentSeason, setCurrentSeason] = useState(Season.Winter.graphqlEnum);//(Season.WINTER);
    const [articlesByUsage, setArticlesByUsage] = useState({});
    const [randomArticles, setRandomArticles] = useState([]);

    useEffect(() => {
        const newArticlesByUsage = groupSeasonalArticlesByUsage(currentSeason, articles);
        setArticlesByUsage(newArticlesByUsage);
    }, [articles, currentSeason]);


    useEffect(() => {
        const newRandomArticles = generateRandomArticles(articlesByUsage);
        setRandomArticles(newRandomArticles);
    }, [articlesByUsage]);

    return (
        <div>
            <Flex justifyContent="space-between" align="top">
                <ToggleButtonGroup
                    alignItems="flex-start"
                    style={{ "marginTop": 7, "marginBottom": 7 }}
                    size="small"
                    value={currentSeason}
                    isExclusive
                    isSelectionRequired
                    onChange={(value) => setCurrentSeason(value)}
                >
                    {SEASONS.map(({ label, graphqlEnum, emoji }) => (
                        <ToggleButton key={graphqlEnum} value={graphqlEnum} title={label}>{emoji}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
                {randomArticles && (
                    <Button
                        size="large"
                        onClick={() => setRandomArticles(generateRandomArticles(articlesByUsage))}
                    >
                        🔄
                    </Button>
                )}
            </Flex>
            {randomArticles.length > 0 && (
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

            )}
            {randomArticles.length === 0 && <span>Generating Random Outfit...</span>}

        </div>
    )
}