import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageReducer";
import blogReducer from "./reducers/blogReducer";

const Store = configureStore({
    reducer: {
        message: messageReducer,
        blogs: blogReducer
    }
})

export default Store