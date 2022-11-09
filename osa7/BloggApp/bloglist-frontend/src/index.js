import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import messageReducer from "./reducers/messageReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        message: messageReducer,
        blog: blogReducer,
        user: userReducer,
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
