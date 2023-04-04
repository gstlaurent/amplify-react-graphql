import React, { useState } from "react";
import {
    Flex,
    Image,
    ToggleButtonGroup,
    ToggleButton,
} from '@aws-amplify/ui-react';
import './styles.css';
import { SEASONS } from "./season";
import { USAGES } from "./usage";


const ArticleEditor = ({ article }) => {
    const [seasons, setSeasons] = useState(article.seasons);
    const [usage, setUsage] = useState(article.usage);

    return (
        <Flex direction="column" justifyContent="space-around">
            <ToggleButtonGroup
                justifyContent="center"
                size="large"
                value={seasons}
                onChange={setSeasons}
            >
                {SEASONS.map((season) => (
                    <ToggleButton
                        key={season.graphqlEnum}
                        className="usage-button"
                        value={season}
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
                onChange={setUsage}
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

