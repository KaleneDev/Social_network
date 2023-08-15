import axios from "axios";
import { Dispatch } from "redux";
import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    UPLOAD_PICTURE,
    UPDATE_BIO,
    DELETE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
} from "./user.type";

const loadUser = () => {
    return {
        type: GET_USER,
        payload: "unknown user",
    };
};
const loadUserSuccess = (user: any) => {
    return {
        type: GET_USER_SUCCESS,
        payload: user,
    };
};
const loadUserError = (error: any) => {
    return {
        type: GET_USER_ERROR,
        payload: error,
    };
};
const updateUserSuccess = (user: any) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: user,
    };
};
const updateUserError = (error: any) => {
    return {
        type: UPDATE_USER_ERROR,
        payload: error,
    };
};

export const getUser = (uid: string) => async (dispatch: Dispatch) => {
    dispatch(loadUser());
    await axios
        .get(`${import.meta.env.VITE_APP_URL}users/id/${uid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            withCredentials: true,
        })
        .then((res) => {
            dispatch(loadUserSuccess(res.data));
        })
        .catch((err) => {
            dispatch(loadUserError(err.message));
        });
};
export const uploadPicture = (data: any) => async (dispatch: Dispatch) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "multipart/form-data",
    };
    await axios
        .post(`${import.meta.env.VITE_APP_URL}users/upload`, data, {
            headers,
            withCredentials: true,
        })
        .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data });
        })
        .catch((err) => {
            console.log(err);
        });
};
export const updateBio =
    (userId: string, data: any) => async (dispatch: Dispatch) => {
        await axios
            .put(
                `${import.meta.env.VITE_APP_URL}users/id/${userId}`,
                { data },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                    withCredentials: true,
                }
            )
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
export const deleteUser = (userId: string) => async (dispatch: Dispatch) => {
    await axios
        .delete(`${import.meta.env.VITE_APP_URL}users/id/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            withCredentials: true,
        })
        .then((res) => {
            dispatch({ type: DELETE_USER, payload: res.data });
        })
        .catch((err) => {
            console.log(err);
        });
};
export const updateUser =
    (userId: string, data: any) => async (dispatch: Dispatch) => {
        await axios
            .put(
                `${import.meta.env.VITE_APP_URL}users/id/${userId}`,
                {
                    data,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                    withCredentials: true,
                }
            )
            .then((res) => {
                dispatch(updateUserSuccess(res.data));
            })
            .catch((err) => {
                dispatch(updateUserError(err.response.data));
            });
    };
