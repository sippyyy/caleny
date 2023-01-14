import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'signin',
    initialState: {
        user: '',
        password: '',
        login: window.localStorage.getItem('user') ? true : false
        // Login status will return true when local storage is already have an existed token user
    },
    reducers: {
        // actions
        setUsername: (state, action) => {
            state.user = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setAuthentication: (state, action) => {
            state.login = action.payload
        }
    }
})