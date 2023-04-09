import React, { useEffect, useState } from "react";
import {
    Button,
    Flex,
    Image,
    Text,
    Card,
} from '@aws-amplify/ui-react';
import { isEmpty } from "./util";
import ModalDialog from "./modaldialog"
import ArticleEditor from "./articleeditor";
import './styles.css';
import { SEASONS } from "./season";

const ArticleCard = ({ article, onDelete, onChange }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [updatedArticle, setUpdatedArticle] = useState(null);

    useEffect(() => {
        // This must be in an effect or else the 'setUpdatedArticle' will trigger a
        // re-render while ArticleCard is already being re-rendered, which is not allowed.
        if (updatedArticle && !isDialogOpen) {
            setUpdatedArticle(null);
            onChange(updatedArticle);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDialogOpen]);

    const seasonEmojis = SEASONS
        .filter(season => article.seasons.includes(season))
        .map(season => season.emoji);

    return (
        <div key={article.id}>
            <Card variation="elevated" minWidth="125px" width="125px" height="95%"
                onClick={() => setIsDialogOpen(true)}>
                <Flex direction="column" justifyContent="space-between" height="100%">
                    <Flex direction="column" justifyContent="flex-start" gap="0">
                        {isEmpty(seasonEmojis)
                            ? <Text as="span">&nbsp;</Text>
                            : <Text as="span">{seasonEmojis}</Text>}
                        <Image src={article.imageUrl} alt={article.usage.label} />
                    </Flex>
                    <Button variation="link" size="small" title={`Delete ${article.usage.label} Article`} onClick={() => {
                        if (window.confirm(`Are you sure you want to delete this ${article.usage.label}?`)) {
                            onDelete(article);
                        }
                    }}>
                        ❌
                    </Button>
                </Flex>
            </Card>
            <ModalDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <ArticleEditor
                    article={updatedArticle ?? article}
                    onChange={setUpdatedArticle} />
            </ModalDialog>
        </div>
    )
}

export default ArticleCard;