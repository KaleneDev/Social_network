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
    const commentsData = useSelector(
        (state: any) => state.commentsReducer.comments
    );
    const commentData = useSelector((state: any) => state.commentsReducer.comment);
    const user = useSelector((state: any) => state.userReducer.user);

    const popupOpenRefs = useRef<boolean[]>([]);
    const popupRef = useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        if (popupOpen) {
            document.documentElement.style.overflow = "hidden"; // Désactiver le défilement
        } else {
            document.documentElement.style.overflow = "auto"; // Réactiver le défilement
        }

        return () => {
            document.documentElement.style.overflow = "auto"; // Assurez-vous de réactiver le défilement lorsque le composant est démonté
        };
    }, [popupOpen]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [applyBlur, setApplyBlur] = useState(false);
    const commentDataRef = useRef(commentData);

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
        setTitle(initialTitle);
        setContent(initialContent);
    }, [props.dataChildrenArticles]);

    useEffect(() => {
        commentDataRef.current = commentData;
    }, [commentData]);


    const handleUpdateArticles = (
        e: any,
        id: string,
        isClose: boolean,
        index: number
    ) => {
        e.preventDefault();

        const updatedArticle = {
            title,
            content,
        };


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
            try {
                if (contentComment.trim() !== "") {
                    const data = {
                        content: contentComment,
                        user_id: user.id,
                        article_id: id,
                    };
                    await dispatch(postComment(data));

                    await new Promise((resolve: any) => {
                        setTimeout(() => {
                            resolve();
                        }, 100);
                    });
                    const newComment = {
                        content: contentComment,
                        user: user,
                        article_id: id,
                        user_id: user.id,
                        createdAt: commentDataRef.current?.createdAt,
                        id: commentDataRef.current?.id,
                    };

                    const putComment = [newComment, ...commentsData];
                    dispatch({
                        type: "GET_COMMENTS_SUCCESS",
                        payload: putComment,
                    });


                    setContentComment("");
                }
            } catch (error) {
                console.log(error);
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

        await new Promise((resolve: any) => {
            setTimeout(() => {
                resolve();
            }, 100);
        });

        const newComment = {
            content: contentComment,
            user: user,
            article_id: id,
            createdAt: commentDataRef.current.comment?.createdAt,
            id: commentDataRef.current.comment?.id,
            user_id: user.id,
        };

        const putComment = [newComment, ...commentData.comments];
        dispatch({
            type: "GET_COMMENTS_SUCCESS",
            payload: putComment,
        });

        setContentComment("");
    };
    return (
        <>
            {applyBlur && <div className="blur-overlay blur-effect "></div>}
            {popupOpenRefs.current.map((isOpen, index) => (
                <div className="container-popup" key={index}>
                    {isOpen && (
                        <>
                            <div
                                ref={popupRef}
                                className={`popup ${popupOpen ? "active" : ""}`}
                            >
                                <div className="container-close">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2.5"
                                        stroke="currentColor"
                                        className="close"
                                        onClick={() =>
                                            handleClosePopup(index, false)
                                        }
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                        />
                                    </svg>
                                    <h2>Post</h2>
                                </div>

                                <div className="popup-content">
                                    <h1>Modifier un article</h1>

                                    <div className="popup-article">
                                        <h3 className="title">Titre : </h3>
                                        {articlesData.articles[index].user &&
                                        (user.id ===
                                            articlesData.articles[index].user
                                                .id ||
                                            user.role === "admin") ? (
                                            <input
                                                type="text"
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                                defaultValue={
                                                    articlesData.articles[index]
                                                        .title
                                                }
                                            />
                                        ) : (
                                            <p>
                                                {
                                                    articlesData.articles[index]
                                                        .title
                                                }
                                            </p>
                                        )}

                                        <h3 className="content">Contenu : </h3>
                                        {articlesData.articles[index].user &&
                                        (user.id ===
                                            articlesData.articles[index].user
                                                .id ||
                                            user.role === "admin") ? (
                                            <textarea
                                                className="post-description"
                                                onChange={(e) =>
                                                    setContent(e.target.value)
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
                                                articlesData.articles[index]
                                                    .user.id ||
                                                user.role === "admin") && (
                                                <div className="btn">
                                                    <button
                                                        className="btn-save"
                                                        onClick={(e) =>
                                                            handleUpdateArticles(
                                                                e,
                                                                articlesData
                                                                    .articles[
                                                                    index
                                                                ].id,
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
                                                        articlesData.articles[
                                                            index
                                                        ].id
                                                    )
                                                }
                                            ></textarea>
                                            <svg
                                                type="submit"
                                                onClick={(e) => {
                                                    handlePostComment(
                                                        e,
                                                        articlesData.articles[
                                                            index
                                                        ].id
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
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default popup;
