import { GET_USERS } from "./users.type";

const initialState = {};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_USERS:
            return action.payload;
        default:
            return state;
    }
}
