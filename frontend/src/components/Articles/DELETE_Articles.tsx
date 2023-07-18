import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { deleteArticles } from "../../redux/articles/articles.action";
import { useState, useRef, useEffect } from "react";

function DELETE_Articles(props: any) {
    // const articlesData = useSelector((state: any) => state.articlesReducer);
    const errorMessagesData = useSelector(
        (state: any) => state.articlesReducer.errorMessage.message
    );

    const dispatch = useDispatch<Dispatch<any>>();
    const [isDeleting, setIsDeleting] = useState(false);

    const [errorMessages, setErrorMessages] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        setErrorMessages(errorMessagesData);
    }, [ errorMessagesData]);

    const handleDeleteArticles = async (e: any, id: string) => {
        e.preventDefault();

        setIsDeleting(true);
 
        const parentDiv = e.target.closest(".article");
        parentDiv.classList.add("ZoomIn");
        await new Promise((resolve: any) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
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
