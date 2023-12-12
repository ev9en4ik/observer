import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieSlice'
import userReducer from './reducers/userSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
    },
})
