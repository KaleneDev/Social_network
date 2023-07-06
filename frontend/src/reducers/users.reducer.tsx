import { GET_USERS } from "../actions/users.action";
const initialState = {};

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_USERS:
            return action.payload;
        default:
            return state;
    }
}