import { useState, useEffect } from "react";
import "../style/pages/Home/home.scss";
import GET_Articles from "../components/Articles/GET_Articles";
import ADD_Articles from "../components/Articles/POST_Articles";

function Home() {
    const [applyBlur, setApplyBlur] = useState(false);

    useEffect(() => {
        console.log(applyBlur);
    }, [applyBlur]);
        
    return (
        <>
            <div className="home">
                <div className="container-home">
                    <ADD_Articles />
                    <GET_Articles />
                </div>
            </div>
        </>
    );
}

export default Home;
