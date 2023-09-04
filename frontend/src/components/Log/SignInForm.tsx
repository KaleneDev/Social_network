import { useState } from "react";
import axios from "axios";

function SignInForm() {
    const url: string = import.meta.env.VITE_APP_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(
                `${url}users/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            const maxAge = 3 * 24 * 60 * 60 * 1000;
            const expirationDate = new Date().getTime() + maxAge;
            localStorage.setItem("jwt", response.data.token);
            localStorage.setItem("jwtExpiration", expirationDate.toString());

            setRedirect(true);
        } catch (error: any) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                if (error.response.data.errors.email) {
                    setErrorEmail("Email inconnu");
                } else if (error.response.data.errors.password) {
                    setErrorPassword("Mot de passe incorrect.");
                }
            } else {
                setErrorMessage("Une erreur est survenue lors de la connexion");
            }
            setLoading(false);
        }
    };
    if (redirect) {
        window.location.href = "/";
    }

    return (
        <div className="form-container">
            <div>Bienvenue sur mon réseau social</div>
            <form action="">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
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
                    <span className="password error">{errorPassword}</span>
                )}
                <button onClick={handleLogin} type="submit">
                    {loading ? "Connexion en cours..." : "Connexion"}
                </button>
            </form>
            {errorMessage && <span className="error">{errorMessage}</span>}
        </div>
    );
}

export default SignInForm;
