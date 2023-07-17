import { useSelector } from "react-redux";
import { ZoomOut } from "../../utils/AnimationText";
import DELETE_Articles from "./DELETE_Articles";
import UPDATE_Articles from "./UPDATE_Articles";
import Info from "../Infos/info";

import "../../style/pages/Home/GET_Articles.home.scss";
import { useRef, useState, useEffect } from "react";
import { log } from "console";

function Articles() {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const containerInfoRef = useRef<any>(null);
    const errorMessages = useSelector(
        (state: any) => state.articlesReducer.errorMessage
    );
    const successMessages = useSelector(
        (state: any) => state.articlesReducer.successMessage
    );

    const [message, setMessage] = useState<string>("");
    const [colorInfo, setColorInfo] = useState<string>("primary-color");

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
            console.log(errorMessages);

            setMessage(errorMessages);
            setColorInfo("danger-color");
            animation();
        }
    }, [articlesData]);

    const containerRef = useRef(null);
    const elementRef = useRef(null);
    const [ref, setRef] = useState(elementRef);

    useEffect(() => {
        setRef(elementRef);
    }, [elementRef, ref]);

    const displayData = articlesData.isLoading ? (
        <p>Loading ...</p>
    ) : articlesData.error ? (
        <p>{articlesData.error}</p>
    ) : (
        articlesData.articles.map((article: any, index: number) => (
            <ZoomOut key={article.id || index} scrolltop="off" elementref={ref}>
                <div className="article" ref={elementRef}>
                    <h4>id : {article.id}</h4>
                    <h3>Titre : {article.title}</h3>
                    <p>Content : {article.content}</p>
                    {article.user && <p>Author: {article.user.username}</p>}
                    <p>Date de publication : {article.createdAt}</p>
                    <div className="article-buttons">
                        <UPDATE_Articles propsParent={article.id} />
                        <DELETE_Articles propsParent={article.id} />
                    </div>
                </div>
            </ZoomOut>
        ))
    );

    return (
        <div className="articles-container" ref={containerRef}>
            <h1>Liste des Postes</h1>
            {displayData}
            {(errorMessages || successMessages) && (
                <Info text={message} color={colorInfo} ref={containerInfoRef} />
            )}
        </div>
    );
}

export default Articles;
