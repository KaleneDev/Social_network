import {
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    UPLOAD_PICTURE,
    UPDATE_BIO,
    DELETE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPLOAD_PICTURE_SUCCESS,
    UPLOAD_PICTURE_ERROR,
} from "./user.type";
const initialState = {
    isLoading: false,
    user: "",
    error: "",
    successUpdateUser: false,
    successUpdateBio: false,
    upload: undefined,
};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                isLoading: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: "",
            };
        case GET_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case UPLOAD_PICTURE:
            return {
                ...state,
                upload: true,
            };
        case UPLOAD_PICTURE_SUCCESS:
            return {
                ...state,
                avatar: action.payload,
                upload: false,
            };
        case UPLOAD_PICTURE_ERROR:
            return {
                ...state,
                error: action.payload,
                upload: false,
            };
        case UPDATE_BIO:
            return {
                ...state,
                successUpdateBio: true,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                successUpdateUser: true,
                error: "",
            };
        case UPDATE_USER_ERROR:
            return {
                ...state,

                error: action.payload,
                successUpdateUser: false,
            };
        case DELETE_USER:
            return {
                ...state,
            };

        default:
            return state;
    }
}
