import { useSelector } from "react-redux";
import "../style/components/pages/home.scss";
import { isEmpty } from "../components/Utils";

function Home() {
    const articles = useSelector((state: any) => state.articlesReducer);
    console.log(articles);

    return (
        <>
            <div className="home">
                <div className="container-home">
                    <div className="articles">
                        <h1>Liste des articles</h1>
                        {!isEmpty(articles) &&
                            articles.map((article: any) => (
                                <div key={article.id}>
                                    <h3>{article.title}</h3>
                                    <p>Content : {article.content}</p>
                                    <hr />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
