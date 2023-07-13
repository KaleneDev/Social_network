import axios from "axios";
import {
    LOAD_ARTICLES,
    LOAD_ARTICLES_SUCCESS,
    LOAD_ARTICLES_ERROR,
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
export const getArticles = () => {
    return (dispatch: any) => {
        dispatch(loadComments())
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
