import "./style/App.scss";
import "./style/variables.scss";
import "./style/index.scss";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Routes from "./components/routes";
import { UserIdContext } from "./components/AppContext";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/user/user.action";
import { Dispatch } from "redux";
import Infos from "./components/Infos/infos";
// import store from "./redux/store";
function App() {
    const [uid, setUid] = useState(null);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const dispatch = useDispatch<Dispatch<any>>();
    const upload = useSelector((state: any) => state.userReducer.upload);
    const [isLoadingFinish, setIsLoadingFinish] = useState(false);
    // const [isConnecting, setIsConnecting] = useState(localStorage.getItem("isConnecting") === "true");

    useEffect(() => {
        if (!upload && upload !== undefined) {
            setIsLoadingFinish(true);
            setTimeout(() => {
                setIsLoadingFinish(false);
                window.location.reload();
            }, 2000);
        }
    }, [upload]);

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
                    localStorage.setItem("isConnecting", "false");
                    localStorage.removeItem("isConnecting");
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
            {upload && (
                <Infos
                    text="Téléchargement en cours..."
                    color="warning-color"
                />
            )}
            {isLoadingFinish && (
                <Infos text="Téléchargement en fini" color="warning-success" />
            )}
            {!isLoginPage && <Navbar />}
            {isLoginPage && uid && <Navbar />}
            <Routes />
        </UserIdContext.Provider>
    );
}

export default App;
