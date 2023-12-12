import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const signIn = createAsyncThunk(
    'user/signIn',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/sign-in',
                data
            )
            const userData = response.data
            localStorage.setItem('token', userData.token)
            return userData.user
        } catch (e) {
            return rejectWithValue(e.response.data.message)
        }
    }
)
export const auth = createAsyncThunk(
    'user/auth',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/auth/auth',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            const userData = await response.data
            localStorage.setItem('token', userData.token)
            return userData.user
        } catch (e) {
            localStorage.removeItem('token')
            return rejectWithValue(e.message)
        }
    }
)
export const rateMovie = createAsyncThunk(
    'user/rateMovie',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/movie/rate`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            const user = await response.data
            return user
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)
export const actionWithWatchlist = createAsyncThunk(
    'user/actionWithWatchlist',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/movie/actionWithWatchlist/${data}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            const user = await response.data
            return user
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected'
    state.user = {}
    state.isAuth = false
    state.error = action.payload
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isAuth: false,
        status: null,
        error: null,
    },
    reducers: {
        signInUser(state, actions) {
            state.user.name = actions.payload.name
            state.user.lastname = actions.payload.lastname
            state.user.email = actions.payload.email
            state.isAuth = true
        },
        signOutUser(state, actions) {
            localStorage.removeItem('token')
            state.user = {}
            state.isAuth = false
        },
    },
    extraReducers: builder => {
        builder
            .addCase(signIn.pending, (state, action) => {
                state.status = 'loading'
                state.user = {}
                state.isAuth = false
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.user = action.payload
                state.isAuth = true
            })
            .addCase(signIn.rejected, (state, action) =>
                setError(state, action)
            )

            .addCase(auth.pending, (state, action) => {
                state.status = 'loading'
                state.user = {}
                state.isAuth = false
                state.error = null
            })
            .addCase(auth.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.user = action.payload
                state.isAuth = true
            })
            .addCase(auth.rejected, (state, action) => setError(state, action))
            .addCase(actionWithWatchlist.pending, (state, action) => {
                state.status = 'loading'
                state.user = {}
                state.error = null
            })
            .addCase(actionWithWatchlist.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.user = action.payload
                state.isAuth = true
            })
            .addCase(actionWithWatchlist.rejected, (state, action) =>
                setError(state, action)
            )
            .addCase(rateMovie.pending, (state, action) => {
                state.status = 'loading'
                state.user = {}
                state.error = null
            })
            .addCase(rateMovie.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.user = action.payload
                state.isAuth = true
            })
            .addCase(rateMovie.rejected, (state, action) =>
                setError(state, action)
            )
    },
})

export const { signInUser, signOutUser } = userSlice.actions
export default userSlice.reducer
