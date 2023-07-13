import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import "../../style/pages/Home/Articles.home.scss";

function Articles() {
    const articles = useSelector((state: any) => state.articlesReducer.articles);

    return (
        <div className="articles-container">
            <h1>Liste des articles</h1>
            {!isEmpty(articles) &&
                articles.map((article: any) => (
                    <div key={article.id} className="article">
                        <h3>{article.title}</h3>
                        <p>Content : {article.content}</p>
                    </div>
                ))}
        </div>
    );
}

export default Articles;
