import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk('auth/loginUser', async (credential) => {
    try {
        const response = await axios.post('http://localhost/api/login', credential)
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
})

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user: null,
        status : 'idle',
        loading: false,
        error : null
    },
    reducers : {
        logout: (state) => {
            state.user = null
            state.status = 'idle'
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
