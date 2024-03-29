import axios from "axios";
import {
    LOAD_ARTICLES,
    LOAD_ARTICLES_SUCCESS,
    LOAD_ARTICLES_ERROR,
    POST_ARTICLES_SUCCESS,
    POST_ARTICLES_ERROR,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_ERROR,
    PUT_ARTICLE_SUCCESS,
    PUT_ARTICLE_ERROR,
    UPDATE_ARTICLES_SUCCESS,
    SERACH_ARTICLES,
    SEARCH_ARTICLES_SUCCESS,
    SEARCH_ARTICLES_ERROR,
} from "./articles.type";

const loadArticles = () => {
    return {
        type: LOAD_ARTICLES,
    };
};
const loadArticlesSuccess = (comments: any) => {
    return {
        type: LOAD_ARTICLES_SUCCESS,
        payload: comments,
    };
};
const loadArticlesError = (error: any) => {
    return {
        type: LOAD_ARTICLES_ERROR,
        payload: error,
    };
};
const postArticlesSuccess = (article: any, message: string) => {
    return {
        type: POST_ARTICLES_SUCCESS,
        payload: article,
        message: message,
    };
};
const postArticlesError = (error: any) => {
    return {
        type: POST_ARTICLES_ERROR,
        payload: error,
    };
};
const deleteArticleSuccess = (id: string, message: string) => {
    return {
        type: DELETE_ARTICLE_SUCCESS,
        payload: id,
        message: message,
    };
};
const deleteArticleError = (error: any) => {
    return {
        type: DELETE_ARTICLE_ERROR,
        payload: error,
    };
};
const updateArticleSuccess = (article: any, message: string) => {
    return {
        type: PUT_ARTICLE_SUCCESS,
        payload: article,
        message: message,
    };
};
const updateArticleError = (error: any) => {
    return {
        type: PUT_ARTICLE_ERROR,
        payload: error,
    };
};
const searchArticlesLoad = () => {
    return {
        type: SERACH_ARTICLES,
    };
}
const searchArticlesSuccess = (articles: any) => {
    return {
        type: SEARCH_ARTICLES_SUCCESS,
        payload: articles,
    };
}
const searchArticlesError = (error: any) => {
    return {
        type: SEARCH_ARTICLES_ERROR,
        payload: error,
    };
}
export const searchArticles = (search: string) => {

    return (dispatch: any) => {
        dispatch(searchArticlesLoad());
        axios
            .get(`${import.meta.env.VITE_APP_URL}articles/search/${search}`, {
                withCredentials: true,
            })
            .then((res) => {
                dispatch(searchArticlesSuccess(res.data));
            })
            .catch((err) => {
                dispatch(searchArticlesError(err.response.data));
            });
    };
}
export const getArticles = () => {
    return (dispatch: any) => {
        dispatch(loadArticles());
        axios
            .get(`${import.meta.env.VITE_APP_URL}articles`, {
                withCredentials: true,
            })
            .then((res) => {
                const sortedArticles = res.data.sort((a: any, b: any) =>
                    a.createdAt > b.createdAt ? -1 : 1
                );
                dispatch(loadArticlesSuccess(sortedArticles));
            })
            .catch((err) => {
                dispatch(loadArticlesError(err.response.data));
            });
    };
};
export const getArticlesByUserId = (uid: string) => {
    return (dispatch: any) => {
        dispatch(loadArticles());
        axios
            .get(`${import.meta.env.VITE_APP_URL}articles/users/${uid}`, {
                withCredentials: true,
            })
            .then((res) => {
                dispatch(postArticlesSuccess(res.data.article, res.data));
            })
            .catch((err) => {
                dispatch(postArticlesError(err.response.data));
            });
    };
};
export const postArticles = (data: any) => async (dispatch: any) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,

    };
    await axios
        .post(`${import.meta.env.VITE_APP_URL}articles`, data, {
            headers,
            withCredentials: true,
        })
        .then((res) => {
            dispatch(postArticlesSuccess(res.data.article, res.data));
        })
        .catch((err) => {
            dispatch(postArticlesError(err.response.data));
        });
};
export const deleteArticles = (id: string) => {
    return (dispatch: any) => {
        axios
            .delete(`${import.meta.env.VITE_APP_URL}articles/id/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                withCredentials: true,
            })
            .then((res) => {
                dispatch(deleteArticleSuccess(id, res.data));
            })
            .catch((err) => {
                dispatch(deleteArticleError(err.response.data));
            });
    };
};
export const updateArticle = (id: string, data: any) => {
    return (dispatch: any) => {
        axios
            .put(`${import.meta.env.VITE_APP_URL}articles/id/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                withCredentials: true,
            })
            .then((res) => {
                dispatch(updateArticleSuccess(res.data.article, res.data));
            })
            .catch((err) => {
                dispatch(updateArticleError(err.response.data));
            });
    };
};
export const updateArticlesSuccess = (updatedArticles: any) => ({
    type: UPDATE_ARTICLES_SUCCESS,
    payload: updatedArticles,
});