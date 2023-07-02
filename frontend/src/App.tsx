import "./style/App.scss";
import "./style/variables.scss";
import "./style/index.scss";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Routes from "./components/routes";
import { UserIdContext } from "./components/AppContext";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
    const [uid, setUid] = useState(null);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    useEffect(() => {
        const getUid = async () => {
            await axios
                .get(`${import.meta.env.VITE_APP_URL}jwtid`, {
                    withCredentials: true,
                })
                .then((response) => {
                    setUid(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getUid();
    }, [uid]);

    return (
        <UserIdContext.Provider value={uid}>
            {!isLoginPage && <Navbar />}
            {isLoginPage && uid && <Navbar />}
            <Routes />
        </UserIdContext.Provider>
    );
}

export default App;
