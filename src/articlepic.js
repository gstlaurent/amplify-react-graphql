import './styles.css';
import {
    Image,
    Button
} from '@aws-amplify/ui-react';
import { isBirthday } from './util';

export const ArticlePic = ({ article, onRefresh }) => {
    return (
        <div className="outfit-article">
            <Image
                key={article.id}
                src={article.imageUrl}
                alt={article.usage.label}
                title={article.usage.label}
                style={{ width: 125 }}
            />
            <Button
                className="article-refresh"
                size="small"
                onClick={onRefresh}
            >
                {isBirthday ? '🥳' : '🔄'}
            </Button>
        </div>
    );

}
