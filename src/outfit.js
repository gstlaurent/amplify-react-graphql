import { fetchArticles } from "./api";
import { useEffect, useState } from "react"
import { groupBy, getRandomInt } from "./util";
import {
    Image,
} from '@aws-amplify/ui-react';

const RandomArticle = ({ usage, articles }) => {
    const index = getRandomInt(articles.length);
    const article = articles.at(index);
    return (
        <div>
            <span>{usage}</span>
            <div>
                <Image
                    src={article.image}
                    alt={usage}
                    style={{ width: 400 }}
                />
            </div>
        </div>
    );
};


export const Outfit = () => {
    const [articlesByUsage, setArticlesByUsage] = useState(null);

    const fetchArticlesByUsage = async () => {
        const articles = await fetchArticles();
        setArticlesByUsage(groupBy(articles, "usage"));
    };

    useEffect(() => {
        fetchArticlesByUsage();
    }, []);



    return (
        <div>
            {!articlesByUsage && <span>Generating Random Outfit...</span>}
            {articlesByUsage &&
                Object.entries(articlesByUsage).map(([usage, articles]) => {
                    return (<RandomArticle key={usage} usage={usage} articles={articles} />);
                })
            }
        </div>

    )

}