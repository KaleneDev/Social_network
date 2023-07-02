import { useContext, useRef } from "react";
import { UserIdContext } from "../components/AppContext";
import Log from "../components/Log/Login";
import Profile from "./Profile.page";
import Header from "../components/Header";
import "../style/components/pages/login.scss";

function Login() {
    const uid = useContext(UserIdContext);
    const loginRef = useRef(null);

    return (
        <div>
            <div className="login-page">
                {uid ? (
                    <>
                        <div>Vous êtes connecté</div>
                        <Profile />
                    </>
                ) : (
                    <>
                        <Header />
                        <div className="login-container" ref={loginRef}>
                            <Log prop={loginRef} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
