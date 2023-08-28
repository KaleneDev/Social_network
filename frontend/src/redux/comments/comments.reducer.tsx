import {
    // POST_COMMENT_LOADING,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_ERROR,
    // DELETE_COMMENT_LOADING,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_ERROR,
    // PUT_COMMENT_LOADING,
    PUT_COMMENT_SUCCESS,
    PUT_COMMENT_ERROR,
    GET_COMMENTS_LOADING,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_ERROR,
    UPDATE_COMMENTS_SUCCESS,
} from "./comments.type";

const initialStateComments = {
    isLoading: false,
    comments: [],
    comment: {},
    successMessage: "",
    errorMessage: "",
};

const commentsReducer = (state = initialStateComments, action: any) => {
    switch (action.type) {
        case GET_COMMENTS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comments: action.payload,
                error: "",
            };
        case GET_COMMENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                comments: [],
                error: action.payload,
            };
        case POST_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comments: [...state.comments, action.payload],
                comment: action.payload,
                successMessage: action.message,
                errorMessage: "",
            };
        case POST_COMMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };

        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comments: state.comments.filter(
                    (comment: any) => comment.id !== action.payload
                ),
                successMessage: action.message,
                errorMessage: "",
            };
        case DELETE_COMMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        case PUT_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comment: action.payload,
                successMessage: action.message,
                errorMessage: "",
            };
        case PUT_COMMENT_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            };
        case UPDATE_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comments: action.payload,
                successMessage: "Comments updated successfully",
                error: "",
            };
        default:
            return state;
    }
};

export default commentsReducer;
