import { useEffect, useState } from "react"
import { groupBy, setRandomArticleByUsage, isEmpty } from "./util";
import {
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Flex,
} from '@aws-amplify/ui-react';
import { Season, SEASONS } from "./season";
import { Usage, USAGES } from "./usage";
import { ArticlePic } from "./articlepic";
import './styles.css';

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
        <div className="outfit">
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
                <Flex className="article-pics" wrap="wrap" alignItems="flex-start" justifyContent="space-around">
                    <ArticlePic randomArticles={randomArticles} usage={Usage.Top} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    {(!topArticle || topArticle.usage !== Usage.Dress.graphqlEnum) &&
                        <ArticlePic randomArticles={randomArticles} usage={Usage.Bottom} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    }
                    <ArticlePic randomArticles={randomArticles} usage={Usage.Sweater} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    <ArticlePic randomArticles={randomArticles} usage={Usage.Outerwear} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    <ArticlePic randomArticles={randomArticles} usage={Usage.Shoes} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    <ArticlePic randomArticles={randomArticles} usage={Usage.Accessory} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    <ArticlePic randomArticles={randomArticles} usage={Usage.Bag} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                </Flex>

            )}
            {isEmpty(randomArticles) && <span>Generating Random Outfit...</span>}

        </div>
    )
}