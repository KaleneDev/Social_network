// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Dispatch } from "redux";
// import { updateArticles } from "../../redux/articles/articles.action";
import "../../style/pages/Home/PUT_Articles.home.scss";

function UPDATE_Articles(props: any) {
    // const profileData = useSelector((state: any) => state.userReducer);
    // const profileDataError = useSelector((state: any) => state.userReducer);

    // const [newTitle, setNewTitle] = useState("");
    // const [newContent, setNewContent] = useState("");

    // const dispatch = useDispatch<Dispatch<any>>();
    // const data = {
    //     title: "test",
    //     content: "test",
    //     user_id: profileData.user.id,
    // };
    const handleUpdateArticles = (e: any, data: any) => {
        e.preventDefault();
        console.log(data);
        
        props.onPopupOpenChange(props.index, true);
    };

    return (
        <>
            <button
                className="btn-update"
                onClick={(e) => handleUpdateArticles(e, props.propsParent)}
            >
                Modifier
            </button>
        </>
    );
}

export default UPDATE_Articles;
