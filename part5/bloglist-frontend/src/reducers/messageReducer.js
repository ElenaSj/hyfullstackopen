import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    successmessage: '',
    errormessage: ''
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setSuccessMessage(state, action) {
            state.successmessage=action.payload
        },
        removeSuccessMessage(state, action) {
            state.successmessage=''
        },
        removeErrorMessage(state, action) {
            state.errormessage=''
        },
        setErrorMessage(state, action) {
            state.errormessage=action.payload
        }
    }
})

export const { setSuccessMessage, removeSuccessMessage, setErrorMessage, removeErrorMessage } = messageSlice.actions

export const notifySuccess = (content) => {
    return async dispatch => {
        dispatch(setSuccessMessage(content))
        setTimeout(() => {
            dispatch(removeSuccessMessage())
        }, 5000)

    }
}

export const notifyError = (content) => {
    return async dispatch => {
        dispatch(setErrorMessage(content))
        setTimeout(() => {
            dispatch(removeErrorMessage())
        }, 5000)

    }
}


export default messageSlice.reducer