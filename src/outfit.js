import { useEffect, useState } from "react"
import { groupBy, getRandomInt, isEmpty } from "./util";
import {
    Image,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Flex,
} from '@aws-amplify/ui-react';
import { Season, SEASONS } from "./season";
import { Usage, USAGES } from "./usage";
import { ArticlePic } from "./articlepic";

const setRandomArticleByUsage = (randomArticles, usage, articlesByUsage) => {
    const usageArticles = articlesByUsage[usage.graphqlEnum];
    if (usageArticles) {
        const index = getRandomInt(usageArticles.length);
        randomArticles[usage.graphqlEnum] = usageArticles.at(index);
    }
};

const generateRandomArticles = (articlesByUsage) => {
    const randomArticles = {};
    USAGES.forEach((usage) => {
        setRandomArticleByUsage(randomArticles, usage, articlesByUsage);

    });
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
    const groupedSeasonalArticles = groupBy(seasonalArticles, "usage");

    // Move DRESS to TOP, but first must ensure both exit
    groupedSeasonalArticles[Usage.Top.graphqlEnum] ??= [];
    groupedSeasonalArticles[Usage.Dress.graphqlEnum] ??= [];
    groupedSeasonalArticles[Usage.Top.graphqlEnum].push(
        ...groupedSeasonalArticles[Usage.Dress.graphqlEnum]
    );
    delete groupedSeasonalArticles[Usage.Dress.graphqlEnum];

    return groupedSeasonalArticles;
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

    const topArticle = randomArticles[Usage.Top.graphqlEnum];

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
                    <ArticlePic article={randomArticles[Usage.Top.graphqlEnum]} />
                    {topArticle && topArticle.usage !== Usage.Dress.graphqlEnum &&
                        <ArticlePic article={randomArticles[Usage.Bottom.graphqlEnum]} />
                    }
                    <ArticlePic article={randomArticles[Usage.Sweater.graphqlEnum]} />
                    <ArticlePic article={randomArticles[Usage.Outerwear.graphqlEnum]} />
                    <ArticlePic article={randomArticles[Usage.Shoes.graphqlEnum]} />
                    <ArticlePic article={randomArticles[Usage.Accessory.graphqlEnum]} />
                    <ArticlePic article={randomArticles[Usage.Bag.graphqlEnum]} />
                </div>

            )}
            {isEmpty(randomArticles) && <span>Generating Random Outfit...</span>}

        </div>
    )
}