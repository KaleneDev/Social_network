import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import usersReducer from "./users/users.reducer";
import articlesReducer from "./articles/articles.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    articlesReducer,
});
