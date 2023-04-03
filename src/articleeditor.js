import React, { useState } from "react";
import {
    Flex,
    Image,
    Text,
    ToggleButtonGroup,
    ToggleButton,
} from '@aws-amplify/ui-react';
import './styles.css';
import { Season, SEASONS } from "./season";
import { Usage, USAGES } from "./usage";


const ArticleEditor = ({ article, onChange }) => {
    return (
        <Flex direction="column" justifyContent="space-around">
            <ToggleButtonGroup
                justifyContent="center"
                size="large"
                value={article.seasons}
                onChange={(newSeasons) => { }}
            >
                {SEASONS.map((season) => (
                    <ToggleButton key={season.graphqlEnum} value={season} title={season.label}>{season.emoji}</ToggleButton>
                ))}
            </ToggleButtonGroup>
            <Image src={article.imageUrl} alt={article.usage.label} />
            <ToggleButtonGroup
                justifyContent="center"
                size="large"
                value={article.usage}
                isExclusive
                onChange={(newUsage) => { }}
            >
                {USAGES.map((usage) => (
                    <ToggleButton key={usage.graphqlEnum} value={usage} title={usage.label}>{usage.emoji}</ToggleButton>
                ))}
            </ToggleButtonGroup>

        </Flex>
    )
}

export default ArticleEditor;