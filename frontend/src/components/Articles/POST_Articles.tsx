import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
    postArticles,
    getArticles,
} from "../../redux/articles/articles.action";

import "../../style/pages/Home/ADD_Articles.home.scss";

function POST_Articles() {
    const profile = useSelector((state: any) => state.userReducer.user);
    const dispatch = useDispatch<Dispatch<any>>();
    const articlesData = useSelector((state: any) => state.articlesReducer);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePostArticles = async (e: any) => {
        e.preventDefault();
        const data = {
            title: title,
            content: content,
            user_id: profile.id,
        };

        try {
            dispatch(postArticles(data));
            const currentDate = new Date().toLocaleDateString();
            const newArticle = {
                title,
                content,
                user: profile,
                createdAt: currentDate,
            };
            const updatedArticles = [newArticle, ...articlesData.articles];
            dispatch({
                type: "LOAD_ARTICLES_SUCCESS",
                payload: updatedArticles,
            });
            setTitle("");
            setContent("");
        } catch (error) {
            // Gérer les erreurs si nécessaire
        }
    };

    useEffect(() => {
        dispatch(getArticles());
    }, []);

    return (
        <div className="post-articles-container">
            <h1>Poster un article</h1>
            <form
                className="post-articles-form"
                action=""
                onSubmit={(e) => handlePostArticles(e)}
            >
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    placeholder="Contenu"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit">Poster</button>
            </form>
        </div>
    );
}

export default POST_Articles;
