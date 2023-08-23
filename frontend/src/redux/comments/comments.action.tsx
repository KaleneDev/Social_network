import axios from "axios";
import {
    GET_COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_ERROR,
    POST_COMMENT_LOADING,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_ERROR,
    // DELETE_COMMENT_LOADING,
    // DELETE_COMMENT_SUCCESS,
    // DELETE_COMMENT_ERROR,
    // PUT_COMMENT_LOADING,
    // PUT_COMMENT_SUCCESS,
    // PUT_COMMENT_ERROR,
} from "./comments.type";

const getCommentsLoading = () => {
    return {
        type: GET_COMMENTS_LOADING,
    };
};
const getCommentsSuccess = (comments: any) => {
    return {
        type: GET_COMMENTS_SUCCESS,
        payload: comments,
    };
};
const getCommentsError = (error: any) => {
    return {
        type: GET_COMMENTS_ERROR,
        payload: error,
    };
};
const postCommentLoading = () => {
    return {
        type: POST_COMMENT_LOADING,
    };
};
const postCommentSuccess = (comment: any, message: string) => {
    return {
        type: POST_COMMENT_SUCCESS,
        payload: comment,
        message: message,
    };
};
const postCommentError = (error: any) => {
    return {
        type: POST_COMMENT_ERROR,
        payload: error,
    };
};
// const deleteCommentLoading = () => {
//     return {
//         type: DELETE_COMMENT_LOADING,
//     };
// };
// const deleteCommentSuccess = (id: string, message: string) => {
//     return {
//         type: DELETE_COMMENT_SUCCESS,
//         payload: id,
//         message: message,
//     };
// };
// const deleteCommentError = (error: any) => {
//     return {
//         type: DELETE_COMMENT_ERROR,
//         payload: error,
//     };
// };
// const putCommentLoading = () => {
//     return {
//         type: PUT_COMMENT_LOADING,
//     };
// };
// const putCommentSuccess = (comment: any, message: string) => {
//     return {
//         type: PUT_COMMENT_SUCCESS,
//         payload: comment,
//         message: message,
//     };
// };
// const putCommentError = (error: any) => {
//     return {
//         type: PUT_COMMENT_ERROR,
//         payload: error,
//     };
// };

export const getComments = () => {
    return (dispatch: any) => {
        dispatch(getCommentsLoading());
        axios
            .get(`${import.meta.env.VITE_APP_URL}comments`)
            .then((response) => {
                const comments = response.data;
                dispatch(getCommentsSuccess(comments));
            })
            .catch((error) => {
                dispatch(getCommentsError(error.message));
            });
    };
};

export const postComment = (data: any) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    return (dispatch: any) => {
        dispatch(postCommentLoading());
        axios
            .post(`${import.meta.env.VITE_APP_URL}comments`, data, {
                headers,
                withCredentials: true,
            })
            .then((response) => {
                const comment = response.data;
                dispatch(postCommentSuccess(comment, "Commentaire ajouté"));
            })
            .catch((error) => {
                dispatch(postCommentError(error.message));
            });
    };
};
