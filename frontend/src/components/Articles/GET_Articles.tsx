import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../style/pages/Home/GET_Articles.home.scss";

function Articles() {
    const articlesData = useSelector((state: any) => state.articlesReducer);

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const updatedArticles = articlesData.articles.map((article: any) => {
    console.log(article);
    
        });

        setArticles(updatedArticles);
    }, [articlesData.articles]);

    const displayData = articlesData.isLoading ? (
        <p>Loading ...</p>
    ) : articlesData.error ? (
        <p>{articlesData.error}</p>
    ) : (
        articlesData.articles.map((article: any) => (
            <div key={article.id} className="article">
                <h3>{article.title}</h3>
                <p>Content : {article.content}</p>
                {article.user && (
                    <p key={article.id}>Author: {article.user.username}</p>
                )}
                <p>Date de publication : {article.createdAt}</p>
            </div>
        ))
    );

    return (
        <div className="articles-container">
            <h1>Liste des Postes</h1>
            {displayData}
        </div>
    );
}

export default Articles;
