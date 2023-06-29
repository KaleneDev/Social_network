import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

function Login(props: any) {
    const [isSignInActive, setSignInActive] = useState(true);
    const [isSignUpActive, setSignUpActive] = useState(false);

    const handleModals = () => {
        const loginContainer = props.prop.current;
        loginContainer.classList.add("topToBottom");
        setTimeout(() => {
            loginContainer.classList.remove("topToBottom");
        }, 500);

        setSignInActive(!isSignInActive);
        setSignUpActive(!isSignUpActive);
    };
    return (
        <div className="connection-form">
            {isSignInActive && <SignInForm />}
            {isSignInActive && (
                <a onClick={handleModals}>
                    Vous n'avez toujours pas de compte ?
                </a>
            )}

            {isSignUpActive && <SignUpForm />}
            {isSignUpActive && (
                <a onClick={handleModals}>Vous avez déjà un compte ?</a>
            )}
        </div>
    );
}

export default Login;
