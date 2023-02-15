import { useState } from "react"
import { groupBy, getRandomInt, sortByStringProperty } from "./util";
import {
    Image,
    Button,
} from '@aws-amplify/ui-react';

export const Outfit = ({ articles }) => {
    const [randomArticles, setRandomArticles] = useState([]);

    const articlesByUsage = groupBy(articles, "usage");

    const generateRandomArticles = () => {
        const newRandomArticles = Object.values(articlesByUsage).map((articles) => {
            const index = getRandomInt(articles.length);
            const article = articles.at(index);
            return article;
        });
        setRandomArticles(sortByStringProperty(newRandomArticles, "usage"));
    }

    if (Object.keys(articlesByUsage).length > 0 && randomArticles.length === 0) {
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
                                style={{ width: 125 }}
                            />)
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}