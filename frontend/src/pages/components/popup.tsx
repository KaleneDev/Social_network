import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateArticle,
    updateArticlesSuccess,
} from "../../redux/articles/articles.action";
import { Dispatch } from "redux";
import { postComment } from "../../redux/comments/comments.action";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
function popup(props: any) {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const commentsData = useSelector(
        (state: any) => state.commentsReducer.comments
    );
    const commentData = useSelector(
        (state: any) => state.commentsReducer.comment
    );
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
    };
    const [editingCommentId, setEditingCommentId] = useState<string | null>(
        null
    );
    function formatDateComments(date: string) {
        const originalDate = date;
        const parsedDate = parseISO(originalDate);
        const formattedDate = format(parsedDate, "dd MMMM yyyy à hh:mm:ss", {
            locale: fr,
        });
        return formattedDate;
    }

    return (
        <>
            {applyBlur && <div className="blur-overlay blur-effect "></div>}
            {popupOpenRefs.current.map((isOpen, index) => {
                if (!isOpen) return null;
                const isEditing =
                    editingCommentId === articlesData.articles[index].id;
                console.log(articlesData.articles[index].user);

                return (
                    <div className="container-popup" key={index}>
                        {isOpen && (
                            <>
                                <div
                                    ref={popupRef}
                                    className={`popup ${
                                        popupOpen ? "active" : ""
                                    }`}
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
                                        <div className="popup-content-edit">
                                            <div className="author">
                                                <Link
                                                    to={`/profile/${articlesData.articles[index].user.id}`}
                                                >
                                                    <img
                                                        className="author-avatar"
                                                        src={
                                                            articlesData
                                                                .articles[index]
                                                                .user.avatar
                                                        }
                                                        alt=""
                                                    />
                                                    <p>
                                                        {
                                                            articlesData
                                                                .articles[index]
                                                                .user.username
                                                        }
                                                    </p>
                                                </Link>
                                            </div>
                                            {(user.id ===
                                                articlesData.articles[index]
                                                    .user.id ||
                                                user.role === "admin") && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="edit"
                                                    onClick={() => {
                                                        if (isEditing) {
                                                            setEditingCommentId(
                                                                null
                                                            );
                                                        } else {
                                                            setEditingCommentId(
                                                                articlesData
                                                                    .articles[
                                                                    index
                                                                ].id
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="popup-article-container">
                                            <div className="popup-article">
                                                {articlesData.articles[index]
                                                    .user &&
                                                (user.id ===
                                                    articlesData.articles[index]
                                                        .user.id ||
                                                    user.role === "admin") &&
                                                isEditing ? (
                                                    <>
                                                        <h3>Titre : </h3>
                                                        <input
                                                            type="text"
                                                            onChange={(e) =>
                                                                setTitle(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            defaultValue={
                                                                articlesData
                                                                    .articles[
                                                                    index
                                                                ].title
                                                            }
                                                        />
                                                    </>
                                                ) : (
                                                    <h3 className="title">
                                                        {
                                                            articlesData
                                                                .articles[index]
                                                                .title
                                                        }
                                                    </h3>
                                                )}

                                                {articlesData.articles[index]
                                                    .user &&
                                                (user.id ===
                                                    articlesData.articles[index]
                                                        .user.id ||
                                                    user.role === "admin") &&
                                                isEditing ? (
                                                    <>
                                                        <h3>Contenu : </h3>
                                                        <textarea
                                                            className="post-description"
                                                            onChange={(e) =>
                                                                setContent(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            defaultValue={
                                                                articlesData
                                                                    .articles[
                                                                    index
                                                                ].content
                                                            }
                                                        />
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
                                                                Modifier
                                                                l'article
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p className="content">
                                                        {
                                                            articlesData
                                                                .articles[index]
                                                                .content
                                                        }
                                                    </p>
                                                )}
                                                <div>
                                                    <p className="date">
                                                        {formatDateComments(
                                                            articlesData
                                                                .articles[index]
                                                                .createdAt
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container-comments">
                                            {/* ajouter un commentaire */}
                                            <div className="add-comment">
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
                                                            articlesData
                                                                .articles[index]
                                                                .id
                                                        )
                                                    }
                                                ></textarea>
                                                <svg
                                                    type="submit"
                                                    onClick={(e) => {
                                                        handlePostComment(
                                                            e,
                                                            articlesData
                                                                .articles[index]
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
                                            <Comments index={index} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
}

export default popup;
