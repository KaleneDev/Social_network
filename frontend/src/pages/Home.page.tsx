import "../style/pages/Home/home.scss";
import Articles from "../components/Articles/Articles";

function Home() {
    return (
        <>
            <div className="home">
                <div className="container-home">
                    <Articles />
                </div>
            </div>
        </>
    );
}

export default Home;
