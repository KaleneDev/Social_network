import axios from "axios";
import {
    GET_USERS,
    GET_USER,
    GET_USER_SUCCES,
    GET_USER_ERROR,
} from "./users.type";

export const loadGetUser = () => {
    return {
        type: GET_USER,
    };
};

export const loadGetUserSuccess = (user: any) => {
    return {
        type: GET_USER_SUCCES,
        payload: user,
    };
};

export const loadGetUserError = (error: any) => {
    return {
        type: GET_USER_ERROR,
        payload: error,
    };
};

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

export const getUser = (userId: string) => {
    return (dispatch: any) => {
        dispatch(loadGetUser());
        axios
            .get(`${import.meta.env.VITE_APP_URL}users/id/${userId}`)
            .then((res) => {
                dispatch(loadGetUserSuccess(res.data));
            })
            .catch((err) => {
                dispatch(loadGetUserError(err.response.data));
            });
    };
};
