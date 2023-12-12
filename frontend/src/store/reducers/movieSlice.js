import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchGenres = createAsyncThunk(
    'movie/fetchGenres',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/genre/genres'
            )

            const genres = response.data
            return genres
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)
export const fetchRecommendation = createAsyncThunk(
    'movie/fetchRecommendation',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/movie/recommendation',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )

            const movies = response.data
            return movies
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)
export const fetchLastMovies = createAsyncThunk(
    'movie/fetchLastMovies',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/movie/last'
            )

            const movies = response.data
            return movies
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)
export const fetchTopMovies = createAsyncThunk(
    'movie/fetchTopMovies',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/movie/top'
            )

            const movies = response.data
            return movies
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)

export const fetchUpcomingMovies = createAsyncThunk(
    'movie/fetchUpcomingMovies',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/movie/upcoming'
            )

            const movies = response.data
            return movies
        } catch (e) {
            console.log(e)
            return rejectWithValue(e.message)
        }
    }
)
export const addMovie = createAsyncThunk(
    'movie/addMovie',
    async (data, { rejectWithValue }) => {
        try {
            const formData = new FormData()
            console.log(data)
            formData.append('data', JSON.stringify(data.movieData))
            formData.append('files', data.poster)
            for (let i = 0; i < data.images.length; i++) {
                formData.append('files', data.images[i])
            }
            const response = await axios.post(
                'http://localhost:5000/api/movie/addMovie',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            const res = response.data
            console.log(res)
            // return res
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        recommendation: [],
        last: [],
        top: [],
        upcoming: [],
        genres: [],
        status: null,
        error: null,
    },
    reducers: {
        addToFavorites(state, actions) {},
        removeFromFavorites(state, actions) {},
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGenres.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
                state.genres = []
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.genres = action.payload
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
                state.genres = []
            })
            .addCase(fetchRecommendation.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
                state.recommendation = []
            })
            .addCase(fetchRecommendation.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.recommendation = action.payload
            })
            .addCase(fetchRecommendation.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
                state.recommendation = []
            })
            .addCase(fetchLastMovies.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
                state.last = []
            })
            .addCase(fetchLastMovies.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.last = action.payload
            })
            .addCase(fetchLastMovies.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
                state.last = []
            })
            .addCase(fetchTopMovies.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
                state.top = []
            })
            .addCase(fetchTopMovies.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.top = action.payload
            })
            .addCase(fetchTopMovies.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
                state.top = []
            })
            .addCase(fetchUpcomingMovies.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
                state.upcoming = []
            })
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.error = null
                state.upcoming = action.payload
            })
            .addCase(fetchUpcomingMovies.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
                state.upcoming = []
            })
    },
})

export const { addToFavorites, removeFromFavorites } = movieSlice.actions
export default movieSlice.reducer
