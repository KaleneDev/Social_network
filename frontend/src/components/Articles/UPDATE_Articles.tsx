import { useSelector } from "react-redux";
import "../../style/pages/Home/PUT_Articles.home.scss";

function UPDATE_Articles(props: any) {
    const articlesData = useSelector((state: any) => state.articlesReducer);
    const handleUpdateArticles = (e: any) => {
        e.preventDefault();
        const initialTitle = articlesData.articles[props.index]?.title || "";
        const initialContent =
            articlesData.articles[props.index]?.content || "";

        const dataChildren = {
            title: initialTitle,
            content: initialContent,
            blur: true,
            isOpen: true,
            index: props.index,
        };
        props.onPopupOpenChange(dataChildren);
    };

    return (
        <>
            <button
                className="btn-update"
                onClick={(e) => handleUpdateArticles(e)}
            >
                Modifier
            </button>
        </>
    );
}

export default UPDATE_Articles;
