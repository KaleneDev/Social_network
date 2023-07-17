import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { deleteArticles } from "../../redux/articles/articles.action";

function DELETE_Articles(props: any) {
    // const articlesData = useSelector((state: any) => state.articlesReducer);
    const dispatch = useDispatch<Dispatch<any>>();

    const handleDeleteArticles = (e: any, id: string) => {
        e.preventDefault();
        // const parentDiv = e.target.closest(".article");
        dispatch(deleteArticles(id));
    };

    return (
        <>
            <button className="btn-delete" onClick={(e) => handleDeleteArticles(e, props.propsParent)}>
                Supprimer
            </button>
        </>
    );
}

export default DELETE_Articles;
