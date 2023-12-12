import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addActor = createAsyncThunk(
    'actors/addActor',
    async (data, { rejectWithValue }) => {
        try {
            const formData = new FormData()

            formData.append('data', JSON.stringify(data.actorData))
            formData.append('file', data.actorPhoto)
            const response = await axios.post(
                'http://localhost:5000/api/actor/addActor',
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

const setError = (state, action) => {
    state.status = 'rejected'
    state.actors = []
    state.error = action.payload
    console.log(action.error.message)
}

const actorSlice = createSlice({
    name: 'actors',
    initialState: {
        actors: [],
        status: null,
        error: null,
    },
    reducers: {
        newActor(state, actions) {
            state.actors.push(actions.payload)
        },
        removeActor(state, actions) {},
    },
    extraReducers: builder => {
        builder
            .addCase(addActor.pending, (state, action) => {
                state.status = 'loading'
                state.actors = []
                state.error = null
            })
            .addCase(addActor.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.actors = [...state.actors, action.payload]
            })
            .addCase(addActor.rejected, (state, action) => setError)
    },
})

export const { newActor, removeActor } = actorSlice.actions
export default actorSlice.reducer
