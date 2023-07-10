import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/index.scss";
import { BrowserRouter } from "react-router-dom";
// REDUX
import { Provider } from "react-redux";
import { getArticles } from "./actions/article.action";
import { getUsers } from "./actions/users.action";
import store from "./redux/store";

store.dispatch(getArticles());
store.dispatch(getUsers());

// const rootElement = document.getElementById("root");
// if (rootElement) {
//     ReactDOM.createRoot(rootElement).render(
//         <React.StrictMode>
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <App />
//                 </BrowserRouter>
//             </Provider>
//         </React.StrictMode>
//     );
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
