import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateArticles } from "../../redux/articles/articles.action";
import { Dispatch } from "redux";

function popup(props: any) {
    const articlesData = useSelector((state: any) => state.articlesReducer);

    const popupOpenRefs = useRef<boolean[]>([]);
    const popupRef = useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);

    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [applyBlur, setApplyBlur] = useState(false);

    const dispatch = useDispatch<Dispatch<any>>();
    useEffect(() => {
        popupOpenRefs.current[props.index] = props.dataChildrenArticles.isOpen;
        setPopupOpen(props.dataChildrenArticles.isOpen);
        setApplyBlur(props.dataChildrenArticles.blur);
        setNewTitle(props.dataChildrenArticles.title);
        setNewContent(props.dataChildrenArticles.content);
        console.log(props.dataChildrenArticles.title);
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
            const titleElement = articleElement.querySelector(".title");
            const contentElement = articleElement.querySelector(".content");

            if (titleElement) {
                titleElement.textContent = `Titre : ${newTitle}`;
            }
            if (contentElement) {
                contentElement.textContent = `Contenu : ${newContent}`;
            }
        }
        dispatch(updateArticles(id, updatedArticle));

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
                                defaultValue={articlesData.articles[index].title}
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
                                            false,
                                            index
                                        )
                                    }
                                >
                                    Enregistrer
                                </button>
                                <button
                                    className="btn-close"
                                    onClick={() =>
                                        handleClosePopup(index, false)
                                    }
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
