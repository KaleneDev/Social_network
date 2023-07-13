import axios from "axios";
import {
    LOAD_ARTICLES,
    LOAD_ARTICLES_SUCCESS,
    LOAD_ARTICLES_ERROR,
    POST_ARTICLES_SUCCESS,
    POST_ARTICLES_ERROR,
} from "./articles.type";

const loadComments = () => {
    return {
        type: LOAD_ARTICLES,
    };
};

const loadCommentsSuccess = (comments: any) => {
    return {
        type: LOAD_ARTICLES_SUCCESS,
        payload: comments,
    };
};

const loadCommentsError = (error: any) => {
    return {
        type: LOAD_ARTICLES_ERROR,
        payload: error,
    };
};
const postCommentsSuccess = (post: any, user: any) => {
    return {
        type: POST_ARTICLES_SUCCESS,
        payload: { articles: post, user: user },
    };
};
const postCommentsError = (error: any) => {
    return {
        type: POST_ARTICLES_ERROR,
        payload: error,
    };
};
export const getArticles = () => {
    return (dispatch: any) => {
        dispatch(loadComments());
        axios
            .get(`${import.meta.env.VITE_APP_URL}articles`)
            .then((res) => {
                dispatch(loadCommentsSuccess(res.data));
            })
            .catch((err) => {
                dispatch(loadCommentsError(err.message));
            });
    };
};

export const getArticlesByUserId = (uid: string) => {
    return (dispatch: any) => {
        dispatch(loadComments());
        axios
            .get(`${import.meta.env.VITE_APP_URL}articles/users/${uid}`)
            .then((res) => {
                dispatch(loadCommentsSuccess(res.data));
            })
            .catch((err) => {
                dispatch(loadCommentsError(err.message));
            });
    };
};

export const postArticles = (data: any, user: any) => async (dispatch: any) => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    await axios
        .post(`${import.meta.env.VITE_APP_URL}articles`, data, { headers })
        .then((res) => {
            dispatch(postCommentsSuccess(res.data, user));
        })
        .catch((err) => {
            dispatch(postCommentsError(err.message));
        });
};
