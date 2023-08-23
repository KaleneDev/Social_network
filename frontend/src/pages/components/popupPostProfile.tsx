import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateArticles } from "../../redux/articles/articles.action";
import { Dispatch } from "redux";

function popup(props: any) {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const articleData = useSelector(
        (state: any) => state.articlesReducer.article
    );
    console.log(articleData);

    const popupOpenRefs = useRef<boolean[]>([]);
    const popupRef = useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [applyBlur, setApplyBlur] = useState(false);
    const [indexArticles, setIndexArticles] = useState(0);
    const dispatch = useDispatch<Dispatch<any>>();

    useEffect(() => {
        const articleIndex = articlesData.articles.findIndex(
            (article: any) =>
                article.id === props.dataChildrenArticles.article_id
        );
        setIndexArticles(articleIndex);
        popupOpenRefs.current[articleIndex] = props.dataChildrenArticles.isOpen;
        setPopupOpen(props.dataChildrenArticles.isOpen);
        setApplyBlur(props.dataChildrenArticles.blur);

        const initialTitle = articlesData.articles[articleIndex]?.title;
        const initialContent =
            articlesData.article?.content ||
            articlesData.articles[articleIndex]?.content;

        setNewTitle(initialTitle);
        setNewContent(initialContent);
    }, [props.dataChildrenArticles]);

    const handleUpdateArticles = (e: any, id: string, isClose: boolean) => {
        e.preventDefault();
        const updatedArticle = {
            title: newTitle,
            content: newContent,
        };

        const articleElement =
            document.querySelectorAll(`.container-posts`)[props.index];
        if (articleElement) {
            const titleElement = articleElement.querySelector(".post-title");

            const contentElement =
                articleElement.querySelector(".post-description");
            if (titleElement) {
                console.log(titleElement);

                titleElement.textContent = `${newTitle}`;
            }
            if (contentElement) {
                contentElement.textContent = `${newContent}`;
            }
        }
        dispatch(updateArticles(id, updatedArticle));

        setApplyBlur(false);
        setPopupOpen(false);

        setTimeout(() => {
            popupOpenRefs.current[indexArticles] = isClose;
        }, 500);
    };
    const handleClosePopup = (isClose: boolean) => {
        setApplyBlur(false);
        setPopupOpen(false);
        setTimeout(() => {
            popupOpenRefs.current[indexArticles] = isClose;
        }, 0);
    };
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
                            <h1>Modifier un article</h1>
                            <h3 className="title">Titre : </h3>
                            <input
                                type="text"
                                onChange={(e) => setNewTitle(e.target.value)}
                                defaultValue={
                                    articlesData.articles[index].title
                                }
                            />
                            <h3 className="content">Contenu : </h3>
                            <textarea
                                onChange={(e) => setNewContent(e.target.value)}
                                defaultValue={
                                    articlesData.articles[index].content
                                }
                            ></textarea>
                            <div className="btn">
                                <button
                                    className="btn-save"
                                    onClick={(e) =>
                                        handleUpdateArticles(
                                            e,
                                            articlesData.articles[index].id,
                                            false
                                        )
                                    }
                                >
                                    Enregistrer
                                </button>
                                <button
                                    className="btn-close"
                                    onClick={() => handleClosePopup(false)}
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default popup;
