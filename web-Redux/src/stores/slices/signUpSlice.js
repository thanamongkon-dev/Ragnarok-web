import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const signUpUser = createAsyncThunk('auth/signUpUser', async (credential) => {
    const response = await axios.post('http://localhost/api/register', credential)
    if (!response.ok) {
        throw new Error('Sign-up failed');
    }
    const data = await response.json();
    return data;
})

const signUpSlice = createSlice({
    name : 'signUp',
    initialState : {
        user: null,
        status : 'idle',
        loading: false,
        error : null
    },
    reducers : {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default signUpSlice.reducer