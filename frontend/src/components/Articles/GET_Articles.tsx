import { useSelector } from "react-redux";
import { ZoomOut, TextAnimationBtoT } from "../../utils/AnimationText";
import DELETE_Articles from "./DELETE_Articles";
import UPDATE_Articles from "./UPDATE_Articles";
import Popup from "../../pages/components/popup";
import Info from "../Infos/infos";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";
import "../../style/pages/Home/GET_Articles.home.scss";

import { useRef, useState, useEffect } from "react";

function Articles() {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const user = useSelector((state: any) => state.userReducer.user);
    const [articles, setArticles] = useState(articlesData.articles);
    useEffect(() => {
        if (articlesData && articlesData.articles) {
            setArticles(articlesData.articles);
        }
    }, [articlesData]);
    const containerInfoRef = useRef<any>(null);
    const errorMessages = useSelector(
        (state: any) => state.articlesReducer.errorMessage.message
    );
    const successMessages = useSelector(
        (state: any) => state.articlesReducer.successMessage.message
    );

    const [message, setMessage] = useState<string>("");
    const [colorInfo, setColorInfo] = useState<string>("primary-color");

    useEffect(() => {
        const animation = () => {
            if (!containerInfoRef.current) return;
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
    // POPUP
    const [index, setIndex] = useState(0);
    const [dataChildrenArticles, setDataChildrenArticles] = useState<any>({});

    const dataChildren = (data: any) => {
        setIndex(data.index);

        const dataArticles = {
            blur: true,
            isOpen: true,
            article_id: data.article_id,
        };

        setDataChildrenArticles(dataArticles);
    };
    function formatDatePost(date: string) {
        const originalDate = date;
        const parsedDate = parseISO(originalDate);
        const formattedDate = format(parsedDate, "dd MMMM yyyy", {
            locale: fr,
        });
        return formattedDate;
    }
    const displayData = articlesData.isLoading ? (
        <p>Loading ...</p>
    ) : articlesData.error ? (
        <p>{articlesData.error}</p>
    ) : (
        articles &&
        articles.map((article: any, index: number) => {
            return (
                <ZoomOut key={article.id || index}>
                    <div className="article" ref={elementRef}>
                        {article.user && (
                            <div className="container-posts">
                                <div className="container-posts">
                                    <div className="block-post">
                                        <div className="block-post-author">
                                            <Link
                                                to={`/profile/${article.user.id}`}
                                            >
                                                <img
                                                    className="avatar"
                                                    src={article.user.avatar}
                                                    alt="avatar"
                                                />
                                            </Link>
                                            <p className="post-date">
                                                <span className="author">
                                                    <Link
                                                        to={`/profile/${article.user.id}`}
                                                    >
                                                        {article.user.username}
                                                    </Link>
                                                </span>{" "}
                                                ·{" "}
                                                <span className="date">
                                                    {" "}
                                                    {formatDatePost(
                                                        article.createdAt
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="block-post-content">
                                            <h3 className="post-title">
                                                {article.title}
                                            </h3>
                                            <p className="post-description">
                                                {article.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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
            <TextAnimationBtoT>
                <h1>Liste des Postes</h1>
            </TextAnimationBtoT>

            {displayData}
            <Popup index={index} dataChildrenArticles={dataChildrenArticles} />
            {(errorMessages || successMessages) && (
                <Info text={message} color={colorInfo} ref={containerInfoRef} />
            )}
        </div>
    );
}

export default Articles;
