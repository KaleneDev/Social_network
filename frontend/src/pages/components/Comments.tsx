import { useSelector, useDispatch } from "react-redux";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteComment } from "../../redux/comments/comments.action";
import { Dispatch } from "redux";

function Comments(props: any) {
    const comments = useSelector(
        (state: any) => state.commentsReducer.comments
    );
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const currentArticle = articlesData.articles[props.index];
    const user = useSelector((state: any) => state.userReducer.user);
    const dispatch = useDispatch<Dispatch<any>>();

    const commentsForCurrentArticle = comments
        .filter((comment: any) => comment.article_id === currentArticle.id)
        .sort(
            (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
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
        if (comments && articlesData.articles && user) {
            setDataLoaded(true);
        }
    }, [comments, articlesData.articles, user]);

    const [loadedComments, setLoadedComments] = useState(false);

    useEffect(() => {
        if (commentsForCurrentArticle.length > 0) {
            setLoadedComments(true);
        }
    }, [commentsForCurrentArticle]);
    // delete comment
    const handleDeleteComment = async (e: any, id: string) => {
        e.preventDefault();
        const reponse = confirm(
            "Voulez-vous vraiment supprimer ce commentaire ?"
        );
        if (!reponse) {
            return;
        }
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
    return (
        <>
            {dataLoaded ? (
                commentsForCurrentArticle.map((comment: any, index: number) => {
                    return (
                        <div className="block-comment" key={index}>
                            <div className="author">
                                <span className="author-name">
                                    {loadedComments ? (
                                        <Link to={`/profile/${user.id}`}>
                                            <img
                                                className="avatar"
                                                src={user.avatar}
                                                alt="avatar"
                                            />
                                            {user.username}
                                        </Link>
                                    ) : (
                                        "Chargement..."
                                    )}
                                </span>

                                <span className="date">
                                    · {formatDateComments(comment.createdAt)}
                                </span>
                            </div>
                            {user.id === comment.user_id ||
                            user.role === "admin" ? (
                                <>
                                    <textarea
                                        value={comment.content}
                                        onChange={(e) =>
                                            console.log(e.target.value)
                                        }
                                    ></textarea>
                                    <button
                                        onClick={(e) => {
                                            handleDeleteComment(e, comment.id);
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                </>
                            ) : (
                                <p>{comment.content}</p>
                            )}
                        </div>
                    );
                })
            ) : (
                <p>Chargement en cours...</p>
            )}
        </>
    );
}

export default Comments;
