import {
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR,
} from "./profile.type";

const initialState = {
    users: [],
    profile: null,
    isLoading: undefined,
    error: "",
};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, isLoading: true };
        case GET_PROFILE_SUCCESS:
            return { profile: action.payload, isLoading: false };
        case GET_PROFILE_ERROR:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}
