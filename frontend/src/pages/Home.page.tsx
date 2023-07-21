import { useState } from "react";
import "../style/pages/Home/Home.scss";
import GET_Articles from "../components/Articles/GET_Articles";
import POST_Articles from "../components/Articles/POST_Articles";

function Home() {
    const [posted, setPosted] = useState(false);

    const handleArticlePostedCallback = (newArticleData: any) => {
        setPosted(newArticleData);
    };

    return (
        <>
            <div className="home">
                <div className="container-home">
                    <POST_Articles
                        onArticlePosted={handleArticlePostedCallback}
                    />
                    <GET_Articles propsParent={posted} />
                </div>
            </div>
        </>
    );
}

export default Home;
