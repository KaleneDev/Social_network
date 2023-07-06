import {
    GET_USER,
    UPLOAD_PICTURE,
    UPDATE_BIO,
    UPDATE_USER,
} from "../actions/user.action";
const initialState = {};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                avatar: action.payload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
            };

        default:
            return state;
    }
}
