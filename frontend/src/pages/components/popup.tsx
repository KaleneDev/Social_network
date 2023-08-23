import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateArticle,
    updateArticlesSuccess,
} from "../../redux/articles/articles.action";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import { postComment } from "../../redux/comments/comments.action";
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
    const handleClosePopup = (index: number, isClose: boolean) => {
        setApplyBlur(false);
        setPopupOpen(false);
        setTimeout(() => {
            popupOpenRefs.current[index] = isClose;
        }, 0);
    };
    const handlePostComment = (e: any, id: string) => {
        e.preventDefault();
        const data = {
            content: contentComment,
            user_id: user.id,
            article_id: id,
        };
        dispatch(postComment(data));
        setContentComment("");
    };
    function formatDateComments(date: string) {
        const originalDate = date;
        const parsedDate = parseISO(originalDate);
        const formattedDate = format(parsedDate, "dd MMMM yyyy à mm:ss", {
            locale: fr,
        });
        return formattedDate;
    }
    return (
        <>
            {applyBlur && <div className="blur-overlay blur-effect "></div>}
            {popupOpenRefs.current.map((isOpen, index) => (
                <div key={index}>
                    {isOpen && (
                        <div
                            ref={popupRef}
                            className={`popup ${popupOpen ? "active" : ""}`}
                        >
                            <div className="close">
                                <h1>Modifier un article</h1>
                                <button
                                    className="btn-close"
                                    onClick={() =>
                                        handleClosePopup(index, false)
                                    }
                                >
                                    Fermer
                                </button>
                            </div>
                            <h3 className="title">Titre : </h3>
                            {articlesData.articles[index].user &&
                            (user.id === articlesData.articles[index].user.id ||
                                user.role === "admin") ? (
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setNewTitle(e.target.value)
                                    }
                                    defaultValue={
                                        articlesData.articles[index].title
                                    }
                                />
                            ) : (
                                <p>{articlesData.articles[index].title}</p>
                            )}

                            <h3 className="content">Contenu : </h3>
                            {articlesData.articles[index].user &&
                            (user.id === articlesData.articles[index].user.id ||
                                user.role === "admin") ? (
                                <textarea
                                    className="post-description"
                                    onChange={(e) =>
                                        setNewContent(e.target.value)
                                    }
                                    defaultValue={
                                        articlesData.articles[index].content
                                    }
                                ></textarea>
                            ) : (
                                <p>{articlesData.articles[index].content}</p>
                            )}

                            {articlesData.articles[index].user &&
                                (user.id ===
                                    articlesData.articles[index].user.id ||
                                    user.role === "admin") && (
                                    <div className="btn">
                                        <button
                                            className="btn-save"
                                            onClick={(e) =>
                                                handleUpdateArticles(
                                                    e,
                                                    articlesData.articles[index]
                                                        .id,
                                                    false,
                                                    index
                                                )
                                            }
                                        >
                                            Enregistrer
                                        </button>
                                    </div>
                                )}
                            <div className="postComment"></div>
                            <div className="container-comments">
                                {/* ajouter un commentaire */}
                                <div className="add-comment">
                                    <h3>Ajouter un commentaire : </h3>

                                    <textarea
                                        className="comment"
                                        placeholder="Votre commentaire"
                                        value={contentComment}
                                        onChange={(e) => {
                                            setContentComment(e.target.value);
                                        }}
                                    ></textarea>
                                    <svg
                                        type="submit"
                                        onClick={(e) => {
                                            handlePostComment(
                                                e,
                                                articlesData.articles[index].id
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

                                    {/* 
                                    <button className="btn-comment">
                                        Commenter
                                    </button> */}
                                </div>
                                <h3>Commentaires : </h3>
                                {articlesData.articles[index].comments.map(
                                    (comment: any, index: number) => {
                                        return (
                                            <div
                                                className="block-comment"
                                                key={index}
                                            >
                                                <div className="author">
                                                    <span className="author-name">
                                                        <Link
                                                            to={`/profile/${comment.user.id}`}
                                                        >
                                                            <img
                                                                className="avatar"
                                                                src={
                                                                    comment.user
                                                                        .avatar
                                                                }
                                                                alt="avatar"
                                                            />
                                                            {
                                                                comment.user
                                                                    .username
                                                            }
                                                        </Link>
                                                    </span>

                                                    <span className="date">
                                                        ·{" "}
                                                        {formatDateComments(
                                                            comment.createdAt
                                                        )}
                                                    </span>
                                                </div>
                                                {articlesData.articles[index]
                                                    .user &&
                                                (user.id === comment.user.id ||
                                                    user.role === "admin") ? (
                                                    <textarea
                                                        defaultValue={
                                                            comment.content
                                                        }
                                                    ></textarea>
                                                ) : (
                                                    <p>{comment.content}</p>
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default popup;
