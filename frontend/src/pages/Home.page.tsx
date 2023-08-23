import "../style/pages/Home/Home.scss";
import GET_Articles from "../components/Articles/GET_Articles";
import POST_Articles from "../components/Articles/POST_Articles";

function Home() {


    return (
        <>
            <div className="home">
                <div className="container-home">
                    <POST_Articles
                       
                    />
                    <GET_Articles/>
                </div>
            </div>
        </>
    );
}

export default Home;
