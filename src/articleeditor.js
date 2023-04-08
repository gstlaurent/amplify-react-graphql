import React, { useState } from "react";
import {
    Flex,
    Image,
    ToggleButtonGroup,
    ToggleButton,
} from '@aws-amplify/ui-react';
import './styles.css';
import { Season, SEASONS } from "./season";
import { USAGES } from "./usage";


const ArticleEditor = ({ article, onChange }) => {
    const [seasons, setSeasons] = useState(article.seasons.map(s => s.graphqlEnum));
    const [usage, setUsage] = useState(article.usage);

    return (
        <Flex direction="column" justifyContent="space-between">
            <ToggleButtonGroup
                justifyContent="center"
                size="large"
                value={seasons}
                onChange={(newSeasons) => {
                    setSeasons(newSeasons);
                    const newArticle = { ...article };
                    newArticle.seasons = newSeasons.map(s => Season[s]);
                    onChange(newArticle);
                }}
            >
                {SEASONS.map((season) => (
                    <ToggleButton
                        key={season.graphqlEnum}
                        className="usage-button"
                        value={season.graphqlEnum}
                        title={season.label}
                    >
                        {season.emoji}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <Image src={article.imageUrl} alt={article.usage.label} />
            <ToggleButtonGroup
                justifyContent="space-between"
                gap="0"
                size="large"
                value={usage}
                isExclusive
                onChange={(newUsage) => {
                    setUsage(newUsage);
                    const newArticle = { ...article };
                    newArticle.usage = newUsage;
                    onChange(newArticle);
                }}
            >
                {USAGES.map((usage) => (
                    <ToggleButton
                        key={usage.graphqlEnum}
                        className="usage-button"
                        value={usage}
                        title={usage.label}

                    >
                        {usage.emoji}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

        </Flex>
    )
}

export default ArticleEditor;

