import { fetchArticles } from "./api";
import { useEffect, useState } from "react"
import { groupBy, getRandomInt, sortByStringProperty } from "./util";
import {
    Image,
    Button,
} from '@aws-amplify/ui-react';

export const Outfit = () => {
    const [articlesByUsage, setArticlesByUsage] = useState(null);
    const [randomArticles, setRandomArticles] = useState(null);

    useEffect(() => {
        fetchArticlesByUsage();
    }, []);


    const fetchArticlesByUsage = async () => {
        const articles = await fetchArticles();
        setArticlesByUsage(groupBy(articles, "usage"));
    };

    const generateRandomArticles = () => {
        const newRandomArticles = Object.values(articlesByUsage).map((articles) => {
            const index = getRandomInt(articles.length);
            const article = articles.at(index);
            return article;
        });
        setRandomArticles(sortByStringProperty(newRandomArticles, "usage"));
    }

    if (articlesByUsage && !randomArticles) {
        generateRandomArticles();
    }

    return (
        <div>
            {!randomArticles && <span>Generating Random Outfit...</span>}
            {randomArticles && (
                <div>
                    <Button
                        size="large"
                        onClick={generateRandomArticles}
                    >
                        🔄
                    </Button>
                    <div>
                        {randomArticles.map((article) => (
                            <Image
                                key={article.id}
                                src={article.image}
                                alt={article.usage}
                                title={article.usage}
                                style={{ width: 400 }}
                            />)
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}