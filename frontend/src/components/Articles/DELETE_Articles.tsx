import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { deleteArticles } from "../../redux/articles/articles.action";

function DELETE_Articles(props: any) {
    const dispatch = useDispatch<Dispatch<any>>();

    const handleDeleteArticles = async (e: any, id: string) => {
        e.preventDefault();
        if (e.target.closest(".article")) {
            const parentDiv = e.target.closest(".article");
            parentDiv.classList.add("ZoomIn");
            await new Promise((resolve: any) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
        }
        await dispatch(deleteArticles(id));
    };

    return (
        <>
            <button
                className={`btn-delete`}
                onClick={(e) => handleDeleteArticles(e, props.propsParent)}
            >
                Supprimer
            </button>
        </>
    );
}

export default DELETE_Articles;
