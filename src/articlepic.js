import './styles.css';
import {
    Image,
    Button
} from '@aws-amplify/ui-react';
import { setRandomArticleByUsage } from "./util";



export const ArticlePic = ({ randomArticles, usage, articlesByUsage, setRandomArticles }) => {
    const article = randomArticles[usage];
    return (article &&
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
                onClick={() => {
                    const newRandomArticles = { ...randomArticles };
                    setRandomArticleByUsage(newRandomArticles, usage, articlesByUsage);
                    setRandomArticles(newRandomArticles);

                }}
            >
                🔄
            </Button>
        </div>
    );

}
