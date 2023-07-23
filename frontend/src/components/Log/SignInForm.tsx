import { useState } from "react";
import axios from "axios";

function SignInForm() {
    const url: string = import.meta.env.VITE_APP_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();

        await axios
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
            .then(() => {
                window.location.href = "/";
            })
            .catch((error) => {
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
            <div>Bienvenue sur mon réseau social</div>
            <form action="" onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {setEmail(e.target.value)} }
                    value={email}
                />
                {errorEmail && (
                    <span className="email error">Email inconnu</span>
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
                <span className="email error">
                    Une erreur est survenue lors de la connexion
                </span>
            )}
        </div>
    );
}

export default SignInForm;
