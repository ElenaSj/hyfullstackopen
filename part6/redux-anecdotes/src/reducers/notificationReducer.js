import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const notify = (content, time) => {
    return async dispatch => {
        const msec = time*1000
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, msec)

    }
}

export default notificationSlice.reducer