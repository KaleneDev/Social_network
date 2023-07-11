import axios from "axios";

export const GET_ARTICLES = "GET_ARTICLES";

export const getArticles = () => {
    return (dispatch: any) => {
        axios
            .get(`${import.meta.env.VITE_APP_URL}articles`)
            .then((res) => {
                dispatch({ type: GET_ARTICLES, payload: res.data })
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
