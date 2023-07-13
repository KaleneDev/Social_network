import {
    LOAD_ARTICLES,
    LOAD_ARTICLES_SUCCESS,
    LOAD_ARTICLES_ERROR,
    POST_ARTICLES_SUCCESS,
    POST_ARTICLES_ERROR,
    ADD_ARTICLE,
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
        case POST_ARTICLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                articles: [...state.articles, action.payload],
                error: "",
            };
        case POST_ARTICLES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case ADD_ARTICLE:
            return {
                ...state,
                isLoading: false,
                articles: [action.payload, ...state.articles], // Ajouter le nouvel article en tête de liste
                error: "",
            };

        default:
            return state;
    }
}
