import axios from "axios";
import { GET_USERS } from "./users.type";

export const getUsers = () => {
    return (dispatch: any) => {
        axios
            .get(`${import.meta.env.VITE_APP_URL}users`)
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
