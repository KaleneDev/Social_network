import axios from "axios";
import { Dispatch } from "redux";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getUser = (uid: string) => async (dispatch: Dispatch) => {
    await axios
        .get(`${import.meta.env.VITE_APP_URL}users/id/${uid}`)
        .then((res) => {
            dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => {
            console.log(err);
        });
};
export const uploadPicture = (data: any) => async (dispatch: Dispatch) => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    await axios
        .post(`${import.meta.env.VITE_APP_URL}users/upload`, data, {
            headers,
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
            .put(`${import.meta.env.VITE_APP_URL}users/id/${userId}`, {
                data,
            })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };
export const deleteUser = (userId: string) => async (dispatch: Dispatch) => {
    await axios
        .delete(`${import.meta.env.VITE_APP_URL}users/id/${userId}`)
        .then((res) => {
            dispatch({ type: DELETE_USER, payload: res.data });
        })
        .catch((err) => {
            console.log(err);
        });
};
export const updateUser = (userId: string, data: any) => async (dispatch: Dispatch) => {
        await axios
            .put(`${import.meta.env.VITE_APP_URL}users/id/${userId}`, {
                data,
            })
            .then((res) => {
                dispatch({ type: UPDATE_USER, payload: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };