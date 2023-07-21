import { useContext, useRef } from "react";
import { UserIdContext } from "../components/AppContext";
import Log from "../components/log/Login.tsx";
import Profile from "./Profile.page";
import Header from "../components/Header/Header";
import "../style/pages/Login/Login.scss";

function Login() {
    const uid = useContext(UserIdContext);
    const loginRef = useRef(null);

    return (
        <div>
            {uid ? (
                <>
                    <Profile />
                </>
            ) : (
                <>
                    <div className="login-page">
                        <Header />
                        <div className="login-container" ref={loginRef}>
                            <Log prop={loginRef} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Login;
