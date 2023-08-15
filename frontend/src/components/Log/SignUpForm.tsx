import { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

function SignUpForm() {
    const url: string = import.meta.env.VITE_APP_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [errorEmail, setErrorEmail] = useState({
        isErrorEmail: false,
        message: "",
    });
    const [errorPassword, setErrorPassword] = useState({
        isErrorPassword: false,
        message: "",
    });
    const [errorUsername, setErrorUsername] = useState({
        isErrorUsername: false,
        message: "",
    });
    const [badRequest, setBadRequest] = useState({
        isBadRequest: false,
        message: "",
    });

    const handleRegister = async (e: any) => {
        e.preventDefault();

        await axios
            .post(
                `${url}users/register`,
                {
                    email,
                    password,
                    username,
                },
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                setFormSubmitted(true);
                // connexion automatique après inscription
                axios
                    .post(
                        `${url}users/login`,
                        {
                            email,
                            password,
                        },

                        {

                            withCredentials: true,
                        }
                    )
                    .then((response) => {
                        const maxAge = 3 * 24 * 60 * 60 * 1000;
                        const expirationDate = new Date().getTime() + maxAge;
                        localStorage.setItem("jwt", response.data.token);
                        localStorage.setItem(
                            "jwtExpiration",
                            expirationDate.toString()
                        );
                        localStorage.setItem("token", response.data);
                        window.location.href = "/";
                    })
                    .catch((error) => {
                        console.log(error.response);
                    });
            })
            .catch((error) => {
                console.log(error.response.data);
                if (error.response.data.errors.badRequest) {
                    setBadRequest({
                        isBadRequest: true,
                        message: error.response.data.errors.badRequest,
                    });
                } else {
                    setBadRequest({ isBadRequest: false, message: "" });
                }
                if (error.response.data.errors.email) {
                    setErrorEmail({
                        isErrorEmail: true,
                        message: error.response.data.errors.email,
                    });
                } else {
                    setErrorEmail({ isErrorEmail: false, message: "" });
                }

                if (error.response.data.errors.password) {
                    setErrorPassword({
                        isErrorPassword: true,
                        message: error.response.data.errors.password,
                    });
                } else {
                    setErrorPassword({ isErrorPassword: false, message: "" });
                }

                if (error.response.data.errors.username) {
                    setErrorUsername({
                        isErrorUsername: true,
                        message: error.response.data.errors.username,
                    });
                } else {
                    setErrorUsername({ isErrorUsername: false, message: "" });
                }
            });
    };

    return (
        <>
            {formSubmitted ? (
                <>
                    <SignInForm />
                    <h4>Votre Inscription à bien été pris en compte</h4>
                </>
            ) : (
                <div className="form-container">
                    <div>Bienvenue sur mon réseau social</div>
                    <form action="" onSubmit={handleRegister}>
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        {errorEmail && (
                            <span className="email error">
                                {errorEmail.message}
                            </span>
                        )}
                        <label htmlFor="username">Nom d'utilisateur*</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        {errorUsername && (
                            <span className="email error">
                                {errorUsername.message}
                            </span>
                        )}
                        <label htmlFor="password">Mot de passe*</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {errorPassword && (
                            <span className="email error">
                                {errorPassword.message}
                            </span>
                        )}
                        <button type="submit">Inscription</button>
                        {errorPassword && (
                            <span className="fields error">
                                {badRequest.message}
                            </span>
                        )}
                    </form>
                    {/* {errorMessage && (
                <span className="email error">
                    Une erreur est survenue lors de la connexion
                </span>
            )} */}
                </div>
            )}
        </>
    );
}

export default SignUpForm;
