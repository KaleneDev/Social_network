import { useSelector, useDispatch } from "react-redux";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
    deleteComment,
    putComment,
    updateCommentsSuccess,
} from "../../redux/comments/comments.action";
import { Dispatch } from "redux";

function Comments(props: any) {
    const comments = useSelector(
        (state: any) => state.commentsReducer.comments
    );
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const currentArticle = articlesData.articles[props.index];
    const user = useSelector((state: any) => state.userReducer.user);
    const dispatch = useDispatch<Dispatch<any>>();

    const commentsForCurrentArticle = comments.filter(
        (comment: any) => comment.article_id === currentArticle.id
    );
    function formatDateComments(date: string) {
        const originalDate = date;
        const parsedDate = parseISO(originalDate);
        const formattedDate = format(parsedDate, "dd MMMM yyyy à hh:mm:ss", {
            locale: fr,
        });
        return formattedDate;
    }

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (comments && articlesData.articles) {
            setDataLoaded(true);
        }
    }, [comments, articlesData.articles]);

    const handleDeleteComment = async (e: any, id: string) => {
        e.preventDefault();
        if (e.target.closest(".block-comment")) {
            const parentDiv = e.target.closest(".block-comment");
            parentDiv.classList.add("ZoomIn");
            await new Promise((resolve: any) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
            parentDiv.classList.remove("ZoomIn");
        }

        await dispatch(deleteComment(id));
    };
    const [editComment, setEditComment] = useState("");

    const textAreaRefs = useRef<boolean[]>([]);
    useEffect(() => {
        textAreaRefs.current = commentsForCurrentArticle;
    }, [commentsForCurrentArticle]);

    const handleTextArea = async (e: any) => {
        e.preventDefault();
    };
    const handleEditComment = async (e: any, comment: any, index: number) => {
        e.preventDefault();
        e.stopPropagation();

        const data = {
            content: editComment,
            user_id: comment.user_id || comment.user.id,
        };
        await dispatch(putComment(comment.id, data));

        const updatedComment = commentsForCurrentArticle.map(
            (comment: any, i: number) => {
                if (i === index) {
                    return {
                        ...comment,
                        content: editComment,
                    };
                }
                return comment;
            }
        );

        dispatch(updateCommentsSuccess(updatedComment));
    };
    const [editingCommentId, setEditingCommentId] = useState<string | null>(
        null
    );

    return (
        <>
            {dataLoaded ? (
                commentsForCurrentArticle &&
                commentsForCurrentArticle.map((comment: any, index: number) => {
                    const isEditing = editingCommentId === comment.id;
                    return (
                        comment.user && (
                            <div className="block-comment" key={index}>
                                <div className="author">
                                    <div className="author-left">
                                        <span className="author-name">
                                            <Link
                                                to={`/profile/${
                                                    comment.user &&
                                                    comment.user.id
                                                }`}
                                            >
                                                <img
                                                    className="avatar"
                                                    src={
                                                        comment.user &&
                                                        comment.user.avatar
                                                    }
                                                    alt="avatar"
                                                />
                                                {comment.user &&
                                                    comment.user.username}
                                            </Link>
                                        </span>

                                        <span className="date">
                                            ·{" "}
                                            {formatDateComments(
                                                comment.createdAt
                                            )}
                                        </span>
                                    </div>
                                    <div className="author-right">
                                        {user.id === comment.user_id ||
                                        user.role === "admin" ? (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="edit"
                                                    onClick={(e) => {
                                                        handleTextArea(e);

                                                        if (isEditing) {
                                                            setEditingCommentId(
                                                                null
                                                            );
                                                        } else {
                                                            setEditingCommentId(
                                                                comment.id
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
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="delete"
                                                    onClick={(e) => {
                                                        handleDeleteComment(
                                                            e,
                                                            comment.id
                                                        );
                                                    }}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                {(user.id === comment.user_id ||
                                    comment.user.id ||
                                    user.role === "admin") &&
                                isEditing ? (
                                    <div className="text-area">
                                        <textarea
                                            defaultValue={
                                                comments[index].content
                                            }
                                            onChange={(e) => {
                                                setEditComment(e.target.value);
                                            }}
                                        ></textarea>
                                        <button
                                            className="edit"
                                            onClick={(e) => {
                                                handleEditComment(
                                                    e,
                                                    comment,
                                                    index
                                                );
                                                setEditingCommentId(null);
                                            }}
                                        >
                                            Valider
                                        </button>
                                    </div>
                                ) : (
                                    <p>{comment.content}</p>
                                )}
                            </div>
                        )
                    );
                })
            ) : (
                <p>Chargement en cours...</p>
            )}
        </>
    );
}

export default Comments;
