import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import articlesReducer from './articles.reducer';

export default combineReducers({
    userReducer,
    usersReducer,
    articlesReducer
});