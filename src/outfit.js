import { useEffect, useState } from "react"
import { groupBy, isEmpty, getRandomInt } from "./util";
import {
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Flex,
} from '@aws-amplify/ui-react';
import { SEASONS } from "./season";
import { Usage, USAGES } from "./usage";
import { ArticlePic } from "./articlepic";
import './styles.css';
import { createOutfit, fetchLastOutfit } from "./api";


export const Outfit = ({ articles }) => {
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentOutfit, setCurrentOutfit] = useState(null);

    let seasonArticlesByUsage = groupSeasonalArticlesByUsage(currentSeason, articles);

    useEffect(() => {
        fetchLastOutfit().then(lastOutfit => {
            if (lastOutfit) {
                setCurrentSeason(lastOutfit.season);
                setCurrentOutfit(lastOutfit);
            } else {
                setCurrentOutfit({ articles: [] });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="currentOutfit">
            <Flex justifyContent="space-between" align="top">
                <ToggleButtonGroup
                    alignItems="flex-start"
                    style={{ "marginTop": 7, "marginBottom": 7 }}
                    size="small"
                    value={currentSeason}
                    isExclusive
                    isSelectionRequired
                    onChange={(newSeason) => {
                        seasonArticlesByUsage = groupSeasonalArticlesByUsage(newSeason, articles);
                        generateAndSaveOutfit(newSeason);
                        setCurrentSeason(newSeason);
                    }}
                >
                    {SEASONS.map((season) => (
                        <ToggleButton key={season.graphqlEnum} value={season} title={season.label}>{season.emoji}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
                {currentOutfit && (
                    <Button
                        size="large"
                        onClick={() => generateAndSaveOutfit(currentSeason)}
                    >
                        🔄
                    </Button>
                )}
            </Flex>
            {
                currentOutfit && (
                    <Flex className="article-pics" wrap="wrap" alignItems="flex-start" justifyContent="space-around">
                        {sortArticles(currentOutfit.articles).map(article => (
                            <ArticlePic key={article.imageUrl} article={article} onRefresh={() => generateNewArticleOfUsage(article.usage)} />
                        ))}
                    </Flex>

                )
            }
            {!currentOutfit && <span>Retrieving last outfit...</span>}

        </div >
    );

    function generateAndSaveOutfit(season) {
        const newOutfit = generateOutfit(season, seasonArticlesByUsage);
        saveOutfit(newOutfit);
    }

    function saveOutfit(newOutfit) {
        if (!isEmpty(newOutfit.articles)) {
            createOutfit(newOutfit);
        }
        setCurrentOutfit(newOutfit);
    }

    function generateNewArticleOfUsage(usage) {
        const articlesOfUsage = seasonArticlesByUsage[usage];
        if (articlesOfUsage.length) {
            const newArticles = [...currentOutfit.articles];
            const oldArticleOfUsage = newArticles.find(article => article.usage === usage);
            const indexOfOldArticleOfUsage = newArticles.indexOf(oldArticleOfUsage);

            const randomIndex = getRandomInt(articlesOfUsage.length);
            const newArticleOfUsage = articlesOfUsage[randomIndex];

            newArticles[indexOfOldArticleOfUsage] = newArticleOfUsage;
            const newOutfit = {
                season: currentSeason,
                articles: newArticles
            };
            saveOutfit(newOutfit);
        }
    };
}

function groupSeasonalArticlesByUsage(currentSeason, articles) {
    if (!articles) {
        return {};
    }
    const seasonalArticles = articles.filter((a) => isArticleInSeason(a, currentSeason));
    const groupedSeasonalArticles = groupBy(seasonalArticles, "usage");
    return groupedSeasonalArticles;
};

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

function removeArticleOfUsage(articles, usage) {
    const articlOfUsage = articles.find(article => article.usage === usage);
    const indexOfArticleOfUsage = articles.indexOf(articlOfUsage);
    articles.splice(indexOfArticleOfUsage, 1);
}

function removeBottomIfHasDress(articles) {
    const hasDress = articles.find(article => article.usage === Usage.DRESS);
    if (hasDress) {
        removeArticleOfUsage(articles, Usage.BOTTOM);
    }
}

function sortArticles(articles) {
    const result = [];
    for (const usage of USAGES) {
        const articleOfUsage = articles.find(article => article.usage === usage);
        if (articleOfUsage) {
            result.push(articleOfUsage);
        }
    }
    return result;
}

function generateOutfit(currentSeason, articlesByUsage) {
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
        season: currentSeason,
        articles: sortedArticles
    };
};

function isArticleInSeason(article, currentSeason) {
    return article.seasons.includes(currentSeason);
};
