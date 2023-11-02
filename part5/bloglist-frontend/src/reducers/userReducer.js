import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { notifySuccess, notifyError } from "./messageReducer";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        logOut(state, action) {
            return null
        }
    }
})

export const { setUser, logOut } = userSlice.actions

export const logIn = credentials => {
    return async dispatch => {
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
            blogService.setToken(user.token)
            dispatch(setUser(user))
            dispatch(notifySuccess(`Welcome back ${user.name}!`))
        } catch (exception) {
            console.log("something went wrong");
            console.log(exception)
            dispatch(notifyError("Wrong credentials, try again"));
        }
    }
}

export const alreadyLoggedIn = userJSON => {
    return async dispatch => {
        const user = JSON.parse(userJSON)
        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export default userSlice.reducer