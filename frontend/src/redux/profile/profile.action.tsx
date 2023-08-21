import axios from "axios";
import {
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR,
} from "./profile.type";

export const loadGetUser = () => {
    return {
        type: GET_PROFILE,
    };
};

export const loadGetUserSuccess = (user: any) => {
    return {
        type: GET_PROFILE_SUCCESS,
        payload: user,
    };
};

export const loadGetUserError = (error: any) => {
    return {
        type: GET_PROFILE_ERROR,
        payload: error,
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
