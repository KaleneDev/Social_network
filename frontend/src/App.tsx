import "./style/App.scss";
import "./style/variables.scss";
import "./style/index.scss";

import { useState, useEffect } from "react";
import Routes from "./components/routes";
import { UserIdContext } from "./components/AppContext";
import axios from "axios";
function App() {
    const [uid, setUid] = useState(null);
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
            <Routes />
        </UserIdContext.Provider>
    );
}

export default App;
