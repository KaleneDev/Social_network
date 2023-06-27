import React, { useState } from "react";
import axios from "axios";

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `http://localhost:3000/users/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token);


                // window.location = "/";
            })
            .catch((error) => {
                console.log(error.response.data.errors);
                if (error.response.data.errors.email) {
                    setErrorEmail(true);
                } else {
                    setErrorEmail(false);
                }

                if (error.response.data.errors.password) {
                    setErrorPassword(true);
                } else {
                    setErrorPassword(false);
                }
                setErrorMessage(true);
            });
    };

    return (
        <div className="form-container">
            <div>Bienvenue sur mon réseau sociale</div>
            <form action="" onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                {errorEmail && (
                    <span className="email error">L'email inconnu</span>
                )}
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                {errorPassword && (
                    <span className="password error">
                        Mot de passe incorrect.
                    </span>
                )}
                <button type="submit">Connexion</button>
            </form>
            {errorMessage && (
                <div className="email error">
                    Une erreur est survenue lors de la connexion
                </div>
            )}
        </div>
    );
}

export default SignInForm;
