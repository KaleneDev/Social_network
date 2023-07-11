import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return (dispatch: any) => {
        axios
            .get(`${import.meta.env.VITE_APP_URL}users`)
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data })
            })
            .catch((err) => {
                console.log(err);
            });
    };
};