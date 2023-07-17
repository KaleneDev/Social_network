import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
    postArticles,
} from "../../redux/articles/articles.action";

import "../../style/pages/Home/POST_Articles.home.scss";

function POST_Articles() {
    const profile = useSelector((state: any) => state.userReducer.user);
    const dispatch = useDispatch<Dispatch<any>>();
    const articlesData = useSelector((state: any) => state.articlesReducer);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const articlesDataRef = useRef(articlesData);
    useEffect(() => {
        articlesDataRef.current = articlesData; 
      }, [articlesData]);
    
    const handlePostArticles = async (e: any) => {
        e.preventDefault();
        
        const data = {
            title: title,
            content: content,
            user_id: profile.id,
        };

        try {
            await dispatch(postArticles(data));
            const newArticle = {
                title,
                content,
                user: profile,
                createdAt: articlesDataRef.current.article.createdAt,
                id: articlesDataRef.current.article?.id,
            };
            const updatedArticles = [newArticle, ...articlesData.articles];
            dispatch({
                type: "LOAD_ARTICLES_SUCCESS",
                payload: updatedArticles,
            });
            setTitle("");
            setContent("");
        } catch (error) {
            console.log(error);

            // Gérer les erreurs si nécessaire
        }
    };
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
