import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateArticle,
    updateArticlesSuccess,
} from "../../redux/articles/articles.action";
import { Dispatch } from "redux";
import { postComment } from "../../redux/comments/comments.action";
import Comments from "./Comments";
function popup(props: any) {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const user = useSelector((state: any) => state.userReducer.user);

    const popupOpenRefs = useRef<boolean[]>([]);
    const popupRef = useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [applyBlur, setApplyBlur] = useState(false);

    const [contentComment, setContentComment] = useState("");

    const dispatch = useDispatch<Dispatch<any>>();
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                popupRef.current &&
                !(popupRef.current as any).contains(e.target)
            ) {
                handleClosePopup(props.index, false);
            }
        };

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [props.index]);
    useEffect(() => {
        popupOpenRefs.current[props.index] = props.dataChildrenArticles.isOpen;
        setPopupOpen(props.dataChildrenArticles.isOpen);
        setApplyBlur(props.dataChildrenArticles.blur);

        const initialTitle = articlesData.articles[props.index]?.title;
        const initialContent = articlesData.articles[props.index]?.content;
        setNewTitle(initialTitle);
        setNewContent(initialContent);
    }, [props.dataChildrenArticles]);

    const handleUpdateArticles = (
        e: any,
        id: string,
        isClose: boolean,
        index: number
    ) => {
        e.preventDefault();

        const updatedArticle = {
            title: newTitle,
            content: newContent,
        };

        const articleElement = document
            .querySelectorAll(`.container-home .articles-container .ZoomOut`)
            [index].querySelector(".article");

        if (articleElement) {
            const titleElement = articleElement.querySelector(".post-title");
            const contentElement =
                articleElement.querySelector(".post-description");

            if (titleElement) {
                titleElement.textContent = `${newTitle}`;
            }
            if (contentElement) {
                contentElement.textContent = `${newContent}`;
            }
        }
        dispatch(updateArticle(id, updatedArticle));

        const updatedArticles = articlesData.articles.map(
            (article: any, i: number) => {
                if (i === index) {
                    return {
                        ...article, // Keep all other properties unchanged
                        content: updatedArticle.content, // Update only content
                        title: updatedArticle.title, // Update only title
                    };
                }
                return article; // Keep other articles unchanged
            }
        );

        dispatch(updateArticlesSuccess(updatedArticles));

        setApplyBlur(false);
        setPopupOpen(false);

        setTimeout(() => {
            popupOpenRefs.current[index] = isClose;
        }, 500);
    };
    const handleKeyDown = async (
        e: React.KeyboardEvent<HTMLTextAreaElement>,
        id: string
    ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (contentComment.trim() !== "") {
                const data = {
                    content: contentComment,
                    user_id: user.id,
                    article_id: id,
                };
                await dispatch(postComment(data));
                setContentComment("");
            }
        }
    };
    const handleClosePopup = (index: number, isClose: boolean) => {
        setApplyBlur(false);
        setPopupOpen(false);
        setTimeout(() => {
            popupOpenRefs.current[index] = isClose;
        }, 0);
    };
    const handlePostComment = async (e: any, id: string) => {
        e.preventDefault();
        const data = {
            content: contentComment,
            user_id: user.id,
            article_id: id,
        };
        await dispatch(postComment(data));
        setContentComment("");
    };
    return (
        <>
            {applyBlur && <div className="blur-overlay blur-effect "></div>}
            {popupOpenRefs.current.map((isOpen, index) => (
                <div className="container-popup" key={index}>
                    {isOpen && (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className={`close ${popupOpen ? "active" : ""}`}
                                onClick={() => handleClosePopup(index, false)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div
                                ref={popupRef}
                                className={`popup ${popupOpen ? "active" : ""}`}
                            >
                                <h1>Modifier un article</h1>

                                <div className="popup-article">
                                    <h3 className="title">Titre : </h3>
                                    {articlesData.articles[index].user &&
                                    (user.id ===
                                        articlesData.articles[index].user.id ||
                                        user.role === "admin") ? (
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setNewTitle(e.target.value)
                                            }
                                            defaultValue={
                                                articlesData.articles[index]
                                                    .title
                                            }
                                        />
                                    ) : (
                                        <p>
                                            {articlesData.articles[index].title}
                                        </p>
                                    )}

                                    <h3 className="content">Contenu : </h3>
                                    {articlesData.articles[index].user &&
                                    (user.id ===
                                        articlesData.articles[index].user.id ||
                                        user.role === "admin") ? (
                                        <textarea
                                            className="post-description"
                                            onChange={(e) =>
                                                setNewContent(e.target.value)
                                            }
                                            defaultValue={
                                                articlesData.articles[index]
                                                    .content
                                            }
                                        />
                                    ) : (
                                        <p>
                                            {
                                                articlesData.articles[index]
                                                    .content
                                            }
                                        </p>
                                    )}

                                    {articlesData.articles[index].user &&
                                        (user.id ===
                                            articlesData.articles[index].user
                                                .id ||
                                            user.role === "admin") && (
                                            <div className="btn">
                                                <button
                                                    className="btn-save"
                                                    onClick={(e) =>
                                                        handleUpdateArticles(
                                                            e,
                                                            articlesData
                                                                .articles[index]
                                                                .id,
                                                            false,
                                                            index
                                                        )
                                                    }
                                                >
                                                    Modifier l'article
                                                </button>
                                            </div>
                                        )}
                                </div>

                                <div className="container-comments">
                                    {/* ajouter un commentaire */}
                                    <div className="add-comment">
                                        <h3>Ajouter un commentaire : </h3>

                                        <textarea
                                            className="comment"
                                            placeholder="Votre commentaire"
                                            value={contentComment}
                                            onChange={(e) => {
                                                setContentComment(
                                                    e.target.value
                                                );
                                            }}
                                            onKeyDown={(e) =>
                                                handleKeyDown(
                                                    e,
                                                    articlesData.articles[index]
                                                        .id
                                                )
                                            }
                                        ></textarea>
                                        <svg
                                            type="submit"
                                            onClick={(e) => {
                                                handlePostComment(
                                                    e,
                                                    articlesData.articles[index]
                                                        .id
                                                );
                                            }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2.5"
                                            className="btn-comment"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                            />
                                        </svg>
                                    </div>
                                    <h3>Commentaires : </h3>
                                    <Comments index={index} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default popup;
