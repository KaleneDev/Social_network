import { GET_ARTICLES } from "./article.action";
const initialState = {};

export default function articlesReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_ARTICLES:
            return action.payload;
        default:
            return state;
    }
}
