import {
    GET_USERS,
    GET_USER,
    GET_USER_SUCCES,
    GET_USER_ERROR,
} from "./users.type";

const initialState = {
    users: [],
    profile: null,
    isLoading: undefined,
    error: "",
};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_USERS:
            return action.payload;
        case GET_USER:
            return { ...state,  isLoading: true };
        case GET_USER_SUCCES:
            return { profile: action.payload, isLoading: false };
        case GET_USER_ERROR:
            return { ...state, error: action.payload, isLoading: false };

        default:
            return state;
    }
}
