import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { postArticles } from "../../redux/articles/articles.action";
import "../../style/pages/Home/ADD_Articles.home.scss";

function POST_Articles() {
    const profile = useSelector((state: any) => state.userReducer.user);
    const dispatch = useDispatch<Dispatch<any>>();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handlePostArticles = (e: any) => {
        e.preventDefault();
        const data = {
            title: title,
            content: content,
            user_id: profile.id,
        };

        dispatch(postArticles(data));
    };

    return (
        <div className="post-articles-container">
            <h1>Poster un article</h1>
            <form
                className="post-articles-form"
                action=""
                onSubmit={(e) => handlePostArticles(e)}
            >
                <input
                    type="text"
                    placeholder="Titre"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    placeholder="Contenu"
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit">Poster</button>
            </form>
        </div>
    );
}

export default POST_Articles;
