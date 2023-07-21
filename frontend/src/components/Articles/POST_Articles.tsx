import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { postArticles } from "../../redux/articles/articles.action";

import "../../style/pages/Home/POST_Articles.home.scss";
import {
    ZoomOut,
    TextAnimationBtoT,
} from "../../utils/AnimationText";

function POST_Articles(props: any) {
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
            setTimeout(() => {
                updateArticleAnimation();
            }, 100);
            await dispatch(postArticles(data));

            function updateArticleAnimation() {
                const articles = document.querySelectorAll(
                    ".articles-container .article"
                );
                articles.forEach((article: any) => {
                    article.style.opacity = "1";
                    article.style.transform = `translateY(${50}px)`;
                    article.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
                });
            }
            props.onArticlePosted(true);


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
        }
    };

    return (
        <div className="post-articles-container">
            <TextAnimationBtoT>
                <h1>Poster un article</h1>
            </TextAnimationBtoT>

            <ZoomOut>
                <form
                    className="post-articles-form"
                    action=""
                    onSubmit={(e) => handlePostArticles(e)}
                >
                    <input
                        type="text"
                        placeholder="Titre ..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={10}
                        placeholder="Contenu ..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <button type="submit" id="addPost">
                        Poster
                    </button>
                </form>
            </ZoomOut>
        </div>
    );
}

export default POST_Articles;
