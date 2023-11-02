import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const Store = configureStore({
    reducer: {
        message: messageReducer,
        user: userReducer,
        blogs: blogReducer
    }
})

export default Store