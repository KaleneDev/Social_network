import React from "react";
import Log from "../components/Log/Login";
import "../style/components/pages/login.scss";
function Login() {
    return (
        <div className="login-page">
            <div className="login-container">
                <Log />
            </div>
        </div>
    );
}

export default Login;
