import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getArticles,
    deleteArticles,
} from "../../redux/articles/articles.action";
import { Dispatch } from "redux";

import { ZoomOut } from "../../utils/AnimationText";

import "../../style/pages/Home/GET_Articles.home.scss";

function Articles() {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const dispatch = useDispatch<Dispatch<any>>();

    const handleDeleteArticles = (e: any, id: string) => {
        e.preventDefault();
        dispatch(deleteArticles(id));
    };
    useEffect(() => {
        dispatch(getArticles());
    }, []);

    const displayData = articlesData.isLoading ? (
        <p>Loading ...</p>
    ) : articlesData.error ? (
        <p>{articlesData.error}</p>
    ) : (
        articlesData.articles.map((article: any, index: number) => (
            <ZoomOut key={article.id || index}>
                <div className="article">
                    <h4>id : {article.id}</h4>
                    <h3>Titre : {article.title}</h3>
                    <p>Content : {article.content}</p>
                    {article.user && <p>Author: {article.user.username}</p>}
                    <p>Date de publication : {article.createdAt}</p>

                    <button
                        onClick={(e) => handleDeleteArticles(e, article.id)}
                    >
                        Supprimer
                    </button>
                </div>
            </ZoomOut>
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
