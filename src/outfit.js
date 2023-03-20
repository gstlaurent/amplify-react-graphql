import { useEffect, useState } from "react"
import { groupBy, isEmpty, getRandomInt } from "./util";
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
import { createOutfit } from "./api";

const moveDressesToTops = (articlesByUsage) => {
    const result = { ...articlesByUsage };

    // Must first ensure both Top and Dress lists exists
    result[Usage.TOP] ??= [];
    result[Usage.DRESS] ??= [];

    // And if it did exist, we must copy the TOP list, since we will be modifying it.
    // We don't want to do a structuredClone because we don't want to copy the enums
    // since then they won't match in comparisons later on
    result[Usage.TOP] = [...result[Usage.TOP]];

    result[Usage.TOP].push(
        ...result[Usage.DRESS]
    );
    delete result[Usage.DRESS];

    return result;
}

const removeArticleOfUsage = (articles, usage) => {
    const articlOfUsage = articles.find(article => article.usage === usage);
    const indexOfArticleOfUsage = articles.indexOf(articlOfUsage);
    articles.splice(indexOfArticleOfUsage, 1);
}

const removeBottomIfHasDress = (articles) => {
    const hasDress = articles.find(article => article.usage === Usage.DRESS);
    if (hasDress) {
        removeArticleOfUsage(articles, Usage.BOTTOM);
    }
}

const sortArticles = (articles) => {
    const result = [];
    for (const usage of USAGES) {
        const articleOfUsage = articles.find(article => article.usage === usage);
        if (articleOfUsage) {
            result.push(articleOfUsage);
        }
    }
    return result;
}

const generateOutfit = (articlesByUsage) => {
    const articlesByUsageTopDresses = moveDressesToTops(articlesByUsage);

    const articleGroups = Object.values(articlesByUsageTopDresses);
    const oneOfEachTypeOfRandomArticle = articleGroups
        .filter(articles => articles?.length > 0)
        .map(articles => {
            const randomIndex = getRandomInt(articles.length);
            return articles[randomIndex];
        });

    removeBottomIfHasDress(oneOfEachTypeOfRandomArticle);

    const sortedArticles = sortArticles(oneOfEachTypeOfRandomArticle);

    return {
        articles: sortedArticles
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


export const Outfit = ({ articles }) => {
    const previousSessionSeason = localStorage.getItem("currentSeason");
    const [currentSeason, setCurrentSeason] = useState(Season?.[previousSessionSeason] ?? Season.WINTER);
    const [articlesByUsage, setArticlesByUsage] = useState({});
    const [outfit, setOutfit] = useState({ articles: [] });

    const generateAndSaveOutfit = () => {
        const newOutfit = generateOutfit(articlesByUsage);
        setOutfit(newOutfit);
        if (!isEmpty(newOutfit.articles)) {
            (async function () {
                createOutfit(newOutfit);
            })();
        }
    };

    useEffect(() => {
        const newArticlesByUsage = groupSeasonalArticlesByUsage(currentSeason, articles);
        setArticlesByUsage(newArticlesByUsage);
        localStorage.setItem("currentSeason", currentSeason.graphqlEnum);
    }, [articles, currentSeason]);

    useEffect(() => {
        generateAndSaveOutfit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articlesByUsage]);

    const generateNewArticleOfUsage = (usage) => {
        const articlesOfUsage = articlesByUsage[usage];
        if (articlesOfUsage.length) {
            const newArticles = [...outfit.articles];
            const oldArticleOfUsage = newArticles.find(article => article.usage === usage);
            const indexOfOldArticleOfUsage = newArticles.indexOf(oldArticleOfUsage);

            const randomIndex = getRandomInt(articlesOfUsage.length);
            const newArticleOfUsage = articlesOfUsage[randomIndex];

            newArticles[indexOfOldArticleOfUsage] = newArticleOfUsage;
            setOutfit({ articles: newArticles });
        }
    };



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
                        onClick={generateAndSaveOutfit}
                    >
                        🔄
                    </Button>
                )}
            </Flex>
            {!isEmpty(outfit.articles) && (
                <Flex className="article-pics" wrap="wrap" alignItems="flex-start" justifyContent="space-around">
                    {outfit.articles.map(article => (
                        <ArticlePic key={article.imageUrl} article={article} onRefresh={() => generateNewArticleOfUsage(article.usage)} />
                    ))}
                </Flex>

            )}
            {isEmpty(outfit.articles) && <span>Generating Random Outfit...</span>}

        </div>
    )
}