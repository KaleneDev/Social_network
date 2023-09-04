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

const initialStateArticles = {
    isLoading: false,
    articles: [],
    article: {},
    searchResults: [],

    error: "",
    errorMessage: "",
    successMessage: "",

    postSuccess: false,
    deleteSuccess: false,
    putSuccess: false,
    searchSuccess: false,
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
                article: action.payload,
                successMessage: action.message,
                errorMessage: "",
            };
        case POST_ARTICLES_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };

        case DELETE_ARTICLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                articles: state.articles.filter(
                    (article: any) => article.id !== action.payload
                ),
                successMessage: action.message,
                errorMessage: "",
            };
        case DELETE_ARTICLE_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        
        case PUT_ARTICLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                article: action.payload,
                successMessage: action.message,
                errorMessage: "",
            };
        case PUT_ARTICLE_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        
        case SERACH_ARTICLES:
            return {
                ...state,
                isLoading: true,
            };
        case SEARCH_ARTICLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                searchResults: action.payload,
                error: "",
            };
        case SEARCH_ARTICLES_ERROR:
            return {
                ...state,
                isLoading: false,
                searchResults: [],
                error: action.payload,
            };


        case UPDATE_ARTICLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                articles: action.payload,
                successMessage: "Articles updated successfully.",
                errorMessage: "",
            };
        
            default:
            return state;
    }
}
