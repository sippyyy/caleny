import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from '../pages/Login/LoginSlice'


const store = configureStore({
    reducer: {
        signin: LoginSlice.reducer,
        // Declare reducer in app
    }
})

export default store