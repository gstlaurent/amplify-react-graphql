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
    groupedSeasonalArticles[Usage.TOP] ??= [];
    groupedSeasonalArticles[Usage.DRESS] ??= [];
    groupedSeasonalArticles[Usage.TOP].push(
        ...groupedSeasonalArticles[Usage.DRESS]
    );
    delete groupedSeasonalArticles[Usage.DRESS];

    return groupedSeasonalArticles;
};


export const Outfit = ({ articles }) => {
    const previousSessionSeason = localStorage.getItem("currentSeason");
    const [currentSeason, setCurrentSeason] = useState(Season?.[previousSessionSeason] ?? Season.WINTER);
    const [articlesByUsage, setArticlesByUsage] = useState({});
    const [randomArticles, setRandomArticles] = useState({});

    useEffect(() => {
        const newArticlesByUsage = groupSeasonalArticlesByUsage(currentSeason, articles);
        setArticlesByUsage(newArticlesByUsage);
        localStorage.setItem("currentSeason", currentSeason.graphqlEnum);
    }, [articles, currentSeason]);


    useEffect(() => {
        const newRandomArticles = generateRandomArticles(articlesByUsage);
        setRandomArticles(newRandomArticles);
    }, [articlesByUsage]);

    const topArticle = randomArticles[Usage.TOP];

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
                    {SEASONS.map((season) => (
                        <ToggleButton key={season.graphqlEnum} value={season} title={season.label}>{season.emoji}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
                {!isEmpty(randomArticles) && (
                    <Button
                        size="large"
                        onClick={() => setRandomArticles(generateRandomArticles(articlesByUsage))}
                    >
                        ????
                    </Button>
                )}
            </Flex>
            {!isEmpty(randomArticles) && (
                <Flex className="article-pics" wrap="wrap" alignItems="flex-start" justifyContent="space-around">
                    <ArticlePic randomArticles={randomArticles} usage={Usage.TOP} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    {(!topArticle || topArticle.usage !== Usage.DRESS) &&
                        <ArticlePic randomArticles={randomArticles} usage={Usage.BOTTOM} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    }
                    <ArticlePic randomArticles={randomArticles} usage={Usage.SWEATER} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    <ArticlePic randomArticles={randomArticles} usage={Usage.OUTERWEAR} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    <ArticlePic randomArticles={randomArticles} usage={Usage.SHOES} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    <ArticlePic randomArticles={randomArticles} usage={Usage.ACCESSORY} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                    <ArticlePic randomArticles={randomArticles} usage={Usage.BAG} articlesByUsage={articlesByUsage} setRandomArticles={setRandomArticles} />
                </Flex>

            )}
            {isEmpty(randomArticles) && <span>Generating Random Outfit...</span>}

        </div>
    )
}