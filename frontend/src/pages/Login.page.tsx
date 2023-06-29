import { useContext, useRef } from "react";
import { UserIdContext } from "../components/AppContext";
import Log from "../components/Log/Login";
import "../style/components/pages/login.scss";

function Login() {
    const uid = useContext(UserIdContext);
    const loginRef = useRef(null);

    return (
        <div>
            <div className="login-page">
                {uid ? (
                    <div>
                        <div>Vous êtes connecté</div>
                        <div>Profile</div>
                    </div>
                ) : (
                    <div className="login-container" ref={loginRef}>
                        <Log prop={loginRef}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
