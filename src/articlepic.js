import './styles.css';
import {
    Image,
    Button
} from '@aws-amplify/ui-react';


export const ArticlePic = ({ article }) => {
    return (article &&
        <div className="outfit-article">
            <Image
                className='pic'
                key={article.id}
                src={article.imageUrl}
                alt={article.usage}
                title={article.usage}
                style={{ width: 125 }}
            />
            <Button
                className="article-refresh"
                size="small"
                onClick={() => console.log(`Article Refresh clicked: ${article.usage}`)}
            >
                🔄
            </Button>
        </div>
    );

}
