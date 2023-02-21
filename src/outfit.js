import { useEffect, useState } from "react"
import { groupBy, getRandomInt, sortByStringProperty, isEmpty } from "./util";
import {
    Image,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Flex,
} from '@aws-amplify/ui-react';
import { Season, SEASONS } from "./season";
import { Usage } from "./usage";

const setRandomArticleByUsage = (randomArticles, usage, articlesByUsage) => {
    const usageArticles = articlesByUsage[usage.graphqlEnum];
    if (usageArticles) {
        const index = getRandomInt(usageArticles.length);
        randomArticles[usage.label] = usageArticles.at(index);
    }
};

const generateRandomArticles = (articlesByUsage) => {
    const randomArticles = {};
    setRandomArticleByUsage(randomArticles, Usage.Top, articlesByUsage);
    setRandomArticleByUsage(randomArticles, Usage.Bottom, articlesByUsage);
    setRandomArticleByUsage(randomArticles, Usage.Dress, articlesByUsage);
    setRandomArticleByUsage(randomArticles, Usage.Outerwear, articlesByUsage);
    setRandomArticleByUsage(randomArticles, Usage.Shoes, articlesByUsage);
    setRandomArticleByUsage(randomArticles, Usage.Accessory, articlesByUsage);
    setRandomArticleByUsage(randomArticles, Usage.Bag, articlesByUsage);
    setRandomArticleByUsage(randomArticles, Usage.Sweater, articlesByUsage);
    return randomArticles;
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
    const [randomArticles, setRandomArticles] = useState({});

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
                {!isEmpty(randomArticles) && (
                    <Button
                        size="large"
                        onClick={() => setRandomArticles(generateRandomArticles(articlesByUsage))}
                    >
                        🔄
                    </Button>
                )}
            </Flex>
            {!isEmpty(randomArticles) && (
                <div>
                    {sortByStringProperty(Object.entries(randomArticles), 0)
                        .map(([usage, article]) => (
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
            {isEmpty(randomArticles) && <span>Generating Random Outfit...</span>}

        </div>
    )
}