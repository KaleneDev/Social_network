import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO } from "../actions/user.action";
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

        default:
            return state;
    }
}
