import { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

function Login(props: any) {
    const [isSignInActive, setSignInActive] = useState(true);
    const [isSignUpActive, setSignUpActive] = useState(false);
    useEffect(() => {
        const handleModals = () => {
            const labels = document.querySelectorAll("label");
            const inputs = document.querySelectorAll("input");
            const button = document.querySelectorAll("button");
            const loginContainer = props.prop.current;

            for (let i = 0; i < button.length; i++) {
                button[i].style.transform = "translateX(-120%)";
                setTimeout(() => {
                    button[i].style.transform = "translateX(0%)";
                    button[i].style.animation = "rightToLeft 0.5s ease-in-out";
                }, 100 * inputs.length);
            }
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].style.transform = "translateX(120%)";
                labels[i].style.transform = "translateX(120%)";
                setTimeout(() => {
                    inputs[i].style.transform = "translateX(0%)";
                    labels[i].style.transform = "translateX(0%)";

                    inputs[i].style.animation = "rightToLeft 0.5s ease-in-out";
                    labels[i].style.animation = "rightToLeft 0.5s ease-in-out";
                }, 100 * i);
            }
            // if (loginContainer) {
            //     loginContainer.classList.add("topToBottom");
            //     setTimeout(() => {
            //         loginContainer.classList.remove("topToBottom");
            //     }, 1000);
            // }
        };
        if (!isSignInActive || !isSignUpActive) {
            handleModals();
        }
    }, [isSignInActive, isSignUpActive]);
    const toggleModals = () => {
        setSignInActive(!isSignInActive);
        setSignUpActive(!isSignUpActive);
    };
    return (
        <div className="connection-form">
            {isSignInActive && <SignInForm />}
            {isSignInActive && (
                <a onClick={toggleModals}>
                    Vous n'avez toujours pas de compte ?
                </a>
            )}

            {isSignUpActive && <SignUpForm />}
            {isSignUpActive && (
                <a onClick={toggleModals}>Vous avez déjà un compte ?</a>
            )}
        </div>
    );
}

export default Login;
