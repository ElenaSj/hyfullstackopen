import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./reducers/messageReducer";

const Store = configureStore({
    reducer: {
        message: messageReducer
    }
})

export default Store