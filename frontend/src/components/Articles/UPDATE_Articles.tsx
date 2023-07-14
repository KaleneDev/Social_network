import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { updateArticles } from "../../redux/articles/articles.action";

function UPDATE_Articles(props: any) {
    const profileData = useSelector((state: any) => state.userReducer);
    const profileDataError = useSelector((state: any) => state.userReducer);
    // console.log(profileDataError);
    useEffect(() => {
        // console.log(profileDataError);
    }, [profileDataError]);
    const dispatch = useDispatch<Dispatch<any>>();
    const data = {
        title: "test",
        content: "test",
        user_id: profileData.user.id,
    };
    const handleUpdateArticles = (e: any, id: string) => {
        e.preventDefault();
        dispatch(updateArticles(id, data));
    };
    return (
        <div>
            <button onClick={(e) => handleUpdateArticles(e, props.propsParent)}>
                Modifier
            </button>
        </div>
    );
}

export default UPDATE_Articles;
