import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArticles } from "../../redux/articles/articles.action";
import "../../style/pages/Home/GET_Articles.home.scss";
import { Dispatch } from "redux";
function Articles() {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const dispatch = useDispatch<Dispatch<any>>();

    useEffect(() => {
        dispatch(getArticles());
    }, [dispatch]);

    const displayData = articlesData.isLoading ? (
        <p>Loading ...</p>
    ) : articlesData.error ? (
        <p>{articlesData.error}</p>
    ) : (
        articlesData.articles.map((article: any) => (
            <div key={article.id} className="article">
                <h3>{article.title}</h3>
                <p>Content: {article.content}</p>
                {article.user && <p>Author: {article.user.username}</p>}
                <p>Date de publication: {article.createdAt}</p>
            </div>
        ))
    );

    return (
        <div className="articles-container">
            <h1>Liste des Articles</h1>
            {displayData}
        </div>
    );
}

export default Articles;
