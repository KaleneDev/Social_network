import {
    LOAD_ARTICLES,
    LOAD_ARTICLES_SUCCESS,
    LOAD_ARTICLES_ERROR,
} from "./articles.type";

const initialStateArticles = {
    isLoading: false,
    articles: [],
    error: "",
};

export default function articlesReducer(
    state = initialStateArticles,
    action: any
) {
    switch (action.type) {
        case LOAD_ARTICLES:
            return {
                ...state,
                isLoading: true,
            };
        case LOAD_ARTICLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                articles: action.payload,
                error: "",
            };
        case LOAD_ARTICLES_ERROR:
            return {
                ...state,
                isLoading: false,
                articles: [],
                error: action.payload,
            };

        default:
            return state;
    }
}
