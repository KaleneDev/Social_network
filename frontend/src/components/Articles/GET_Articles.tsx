import { useSelector } from "react-redux";
import { ZoomOut } from "../../utils/AnimationText";
import DELETE_Articles from "./DELETE_Articles";
import UPDATE_Articles from "./UPDATE_Articles";

import "../../style/pages/Home/GET_Articles.home.scss";

function Articles() {
    const articlesData = useSelector((state: any) => state.articlesReducer);

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
                    <div className="article-buttons">
                        <UPDATE_Articles propsParent={article.id} />
                        <DELETE_Articles propsParent={article.id} />
                    </div>
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
