import { useSelector } from "react-redux";
import "../style/components/pages/home.scss";
import { isEmpty } from "../components/Utils";

function Home() {
    // const [users, setUsers] = useState<User[]>([]);
    // const [articles, setArticles] = useState<Article[]>([]);

    const users = useSelector((state: any) => state.usersReducer);
    const articles = useSelector((state: any) => state.articlesReducer);

    return (
        <>
            <div className="home">
                <div className="container-home">
                    <div className="users">
                        <h1>Home</h1>
                        <h1>Liste des utilisateurs</h1>
                        {!isEmpty(users) &&
                            users.map((user: any) => (
                                <div key={user.id}>
                                    <h3>{user.username}</h3>
                                    <p>Email : {user.email}</p>
                                    <hr />
                                </div>
                            ))}
                    </div>
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
