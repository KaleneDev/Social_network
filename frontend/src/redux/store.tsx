import { configureStore } from "@reduxjs/toolkit";
import rootReducer from ".";
import thunk from "redux-thunk";
export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk],
});

export default store;
