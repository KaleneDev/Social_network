import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/index.scss";
import "./style/main.scss";
import { BrowserRouter } from "react-router-dom";
// REDUX
import { Provider } from "react-redux";
import { getArticles } from "./redux/articles/articles.action";
import { getUsers } from "./redux/users/users.action";
import { getComments } from "./redux/comments/comments.action";
import store from "./redux/store";

store.dispatch(getArticles());
store.dispatch(getUsers());
store.dispatch(getComments());

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);
