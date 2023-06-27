import React, { useState } from "react";

function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    console.log(email, password, username);
    const handleRegister = async (e) => {
        e.preventDefault();

        await axios
            .post(
                "http://localhost:5000/api/user/register",
                {
                    email,
                    password,
                    username,
                },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                console.log(response);

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

                if (error.response.data.errors.username) {
                    setErrorUsername(true);
                } else {
                    setErrorUsername(false);
                }
                setErrorMessage(true);
            });
    };

    return (
        <div className="form-container">
            <div>Bienvenue sur mon réseau sociale</div>
            <form action="" onSubmit={handleRegister}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit">Inscription</button>
            </form>
        </div>
    );
}

export default SignUpForm;
