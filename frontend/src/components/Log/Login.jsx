import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

function Login() {
    const [isSignInActive, setSignInActive] = useState(true);
    const [isSignUpActive, setSignUpActive] = useState(false);

    const handleModals = () => {
        setSignInActive(!isSignInActive);
        setSignUpActive(!isSignUpActive);
    };
    return (
        <div className="connection-form">
            {isSignInActive && <SignInForm />}
            {isSignUpActive && <SignUpForm />}
            {isSignInActive && (
                <a onClick={handleModals}>
                    Vous n'avez toujours pas de compte ?
                </a>
            )}
            {isSignUpActive && (
                <a onClick={handleModals}>Vous avez déjà un compte ?</a>
            )}
        </div>
    );
}

export default Login;
