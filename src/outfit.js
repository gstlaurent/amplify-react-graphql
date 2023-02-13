import { fetchArticles } from "api";
import { useEffect, useState } from "react"
import { groupBy } from "util";


export const Outfit = () => {
    const [articlesByRole, setArticlesByRole] = useState(null);

    const fetchArticlesByRole = async () => {
        const articles = await fetchArticles();
        setArticlesByRole(groupBy(articles, "usage"));
    };


    useEffect(() => {
        fetchArticlesByRole();
    }, []);



    return (
        <div>
            {!articlesByRole && <span>Generating Random Outfit...</span>}
            {articlesByRole && <span>{JSON.stringify(articlesByRole)}</span>}
        </div>

    )

}