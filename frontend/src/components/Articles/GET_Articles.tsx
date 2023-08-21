import { useSelector, useDispatch } from "react-redux";
import { ZoomOut, TextAnimationBtoT } from "../../utils/AnimationText";
import DELETE_Articles from "./DELETE_Articles";
import UPDATE_Articles from "./UPDATE_Articles";
import Info from "../Infos/infos";
import { Dispatch } from "redux";
import { updateArticles } from "../../redux/articles/articles.action";
import { Link } from 'react-router-dom'; 

import "../../style/pages/Home/GET_Articles.home.scss";
import { useRef, useState, useEffect } from "react";

function Articles(props: any) {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const user = useSelector((state: any) => state.userReducer.user);

    const containerInfoRef = useRef<any>(null);
    const errorMessages = useSelector(
        (state: any) => state.articlesReducer.errorMessage.message
    );
    const successMessages = useSelector(
        (state: any) => state.articlesReducer.successMessage.message
    );

    const [message, setMessage] = useState<string>("");
    const [colorInfo, setColorInfo] = useState<string>("primary-color");

    const dispatch = useDispatch<Dispatch<any>>();
    useEffect(() => {
        const animation = () => {
            containerInfoRef.current.style.visibility = "visible";
            containerInfoRef.current.style.opacity = "1";
            setTimeout(() => {
                containerInfoRef.current.style.opacity = "0";
                setTimeout(() => {
                    containerInfoRef.current.style.visibility = "hidden";
                }, 1000);
            }, 8000);
        };
        if (successMessages) {
            setMessage(successMessages);
            setColorInfo("success-color");
            animation();
        }

        if (errorMessages) {
            setMessage(errorMessages);
            setColorInfo("danger-color");
            animation();
        }
    }, [articlesData]);

    const containerRef = useRef(null);
    const elementRef = useRef(null);
    const [ref, setRef] = useState(elementRef);

    // article down to add new article
    const [clickPost, setClickPost] = useState(false);
    useEffect(() => {
        setClickPost(props.propsParent);
    }, [clickPost, props.propsParent]);

    const popupRef = useRef(null);
    const [popup, setPopup] = useState(popupRef);

    useEffect(() => {
        setRef(elementRef);
        setPopup(popupRef);
    }, [elementRef, ref, popupRef, popup]);
    // POPUP
    const [applyBlur, setApplyBlur] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    const popupOpenRefs = useRef<boolean[]>([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const dataChildren = (data: any) => {
        setApplyBlur(data.blur);
        setNewContent(data.content);
        setNewTitle(data.title);
        popupOpenRefs.current[data.index] = data.isOpen;
        setPopup(popupRef);
        setTimeout(() => {
            setPopupOpen(true);
        }, 0);
    };
    const handleClosePopup = (index: number, isClose: boolean) => {
        setApplyBlur(false);
        setPopupOpen(false);
        setTimeout(() => {
            popupOpenRefs.current[index] = isClose;
        }, 0);
    };

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

        dispatch(updateArticles(id, updatedArticle));
        const articleElement = document
            .querySelectorAll(`.container-home .articles-container .ZoomOut`)
            [index].querySelector(".article");
        if (articleElement) {
            const titleElement = articleElement.querySelector("h3");
            const contentElement =
                articleElement.querySelector("p:nth-of-type(1)");

            if (titleElement) {
                titleElement.textContent = `Titre : ${newTitle}`;
            }

            if (contentElement) {
                contentElement.textContent = `Contenu : ${newContent}`;
            }
        }
        setApplyBlur(false);
        setPopupOpen(false);
        setTimeout(() => {
            popupOpenRefs.current[index] = isClose;
        }, 500);
    };

    const displayData = articlesData.isLoading ? (
        <p>Loading ...</p>
    ) : articlesData.error ? (
        <p>{articlesData.error}</p>
    ) : (
        articlesData.articles.map((article: any, index: number) => {
            return (
                <ZoomOut key={article.id || index}>
                    <div className="article" ref={elementRef}>
                    {article.user && (
                        <p>
                            Auteur: <Link to={`/profile/${article.user.id}`}>{article.user.username}</Link>
                        </p>
                    )}
                        {/* {article.user && <p>Auteur: {article.user.username}</p>} */}
                        <h3>Titre : {article.title}</h3>
                        <p>Contenu : {article.content}</p>
                        <p>Date de publication : {article.createdAt}</p>
                        <div className="article-buttons">
                            {article.user &&
                                (user.id === article.user.id ||
                                    user.role === "admin") && (
                                    <>
                                        <UPDATE_Articles
                                            propsParent={article.id}
                                            onPopupOpenChange={dataChildren}
                                            index={index}
                                        />
                                        <DELETE_Articles
                                            propsParent={article.id}
                                        />
                                    </>
                                )}
                        </div>
                    </div>
                </ZoomOut>
            );
        })
    );

    return (
        <div className="articles-container" ref={containerRef}>
            {applyBlur && <div className="blur-overlay blur-effect "></div>}
            <TextAnimationBtoT>
                <h1>Liste des Postes</h1>
            </TextAnimationBtoT>

            {displayData}
            {popupOpenRefs.current.map((isOpen, index) => (
                <div key={index}>
                    {isOpen && (
                        <div
                            ref={popupRef}
                            className={`popup ${popupOpen ? "active" : ""}`}
                        >
                            <h1>Modifier un article</h1>
                            <h3>Titre : </h3>
                            <input
                                type="text"
                                onChange={(e) => setNewTitle(e.target.value)}
                                defaultValue={
                                    articlesData.articles[index].title
                                }
                            />
                            <h3>Contenu : </h3>
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

            {(errorMessages || successMessages) && (
                <Info text={message} color={colorInfo} ref={containerInfoRef} />
            )}
        </div>
    );
}

export default Articles;
