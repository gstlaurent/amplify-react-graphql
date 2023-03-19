import { useEffect, useState } from "react"
import { groupBy, setRandomArticleByUsage, isEmpty, getRandomInt } from "./util";
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

const moveDressesToTops = (articlesByUsage) => {
    // Move DRESS to TOP, but first must ensure both exit
    articlesByUsage[Usage.TOP] ??= [];
    articlesByUsage[Usage.DRESS] ??= [];
    articlesByUsage[Usage.TOP].push(
        ...articlesByUsage[Usage.DRESS]
    );
    delete articlesByUsage[Usage.DRESS];
}

const removeBottomIfHasDress = (articles) => {
    const hasDress = articles.find(article => article.usage === Usage.DRESS);
    if (hasDress) {
        const bottom = articles.find(article => article.usage === Usage.BOTTOM);
        const indexOfBottom = articles.indexOf(bottom);
        articles.splice(indexOfBottom, 1);
    }
}

const sortArticles = (articles) => {
    // TODO
}

const generateOutfit = (articlesByUsage) => {
    moveDressesToTops(articlesByUsage);

    const articleGroups = Object.values(articlesByUsage);
    const oneOfEachTypeOfRandomArticle = articleGroups
        .filter(articles => articles?.length > 0)
        .map(articles => {
            const randomIndex = getRandomInt(articles.length);
            return articles[randomIndex];
        });

    removeBottomIfHasDress(oneOfEachTypeOfRandomArticle);

    sortArticles(oneOfEachTypeOfRandomArticle);

    return {
        articles: oneOfEachTypeOfRandomArticle
    };
};

const isArticleInSeason = (article, currentSeason) => {
    return article.seasons.includes(currentSeason);
};

const groupSeasonalArticlesByUsage = (season, articles) => {
    if (!articles) {
        return {};
    }
    const seasonalArticles = articles.filter((a) => isArticleInSeason(a, season));
    const groupedSeasonalArticles = groupBy(seasonalArticles, "usage");
    return groupedSeasonalArticles;
};


const generateNewArticleOfUsage = (uage) => {
    // TODO
};

export const Outfit = ({ articles }) => {
    const previousSessionSeason = localStorage.getItem("currentSeason");
    const [currentSeason, setCurrentSeason] = useState(Season?.[previousSessionSeason] ?? Season.WINTER);
    const [articlesByUsage, setArticlesByUsage] = useState({});
    const [outfit, setOutfit] = useState({ articles: [] });

    useEffect(() => {
        const newArticlesByUsage = groupSeasonalArticlesByUsage(currentSeason, articles);
        setArticlesByUsage(newArticlesByUsage);
        localStorage.setItem("currentSeason", currentSeason.graphqlEnum);
    }, [articles, currentSeason]);


    useEffect(() => {
        const newOutfit = generateOutfit(articlesByUsage);
        setOutfit(newOutfit);
    }, [articlesByUsage]);

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
                {!isEmpty(outfit.articles) && (
                    <Button
                        size="large"
                        onClick={() => setOutfit(generateOutfit(articlesByUsage))}
                    >
                        🔄
                    </Button>
                )}
            </Flex>
            {!isEmpty(outfit.articles) && (
                <Flex className="article-pics" wrap="wrap" alignItems="flex-start" justifyContent="space-around">
                    {outfit.articles.map(article => (
                        <ArticlePic article={article} onRefresh={() => generateNewArticleOfUsage(article.usage)} />
                    ))}
                </Flex>

            )}
            {isEmpty(outfit.articles) && <span>Generating Random Outfit...</span>}

        </div>
    )
}