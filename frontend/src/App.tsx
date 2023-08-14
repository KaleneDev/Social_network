import "./style/App.scss";
import "./style/variables.scss";
import "./style/index.scss";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Routes from "./components/routes";
import { UserIdContext } from "./components/AppContext";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";

import { getUser } from "./redux/user/user.action";

import { Dispatch } from "redux";
// import store from "./redux/store";
function App() {
    const [uid, setUid] = useState(null);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const dispatch = useDispatch<Dispatch<any>>();

    useEffect(() => {
        const getUid = async () => {
            await axios
                .get(`${import.meta.env.VITE_APP_URL}jwtid`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
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

        if (uid) {
            dispatch(getUser(uid));
        }
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
