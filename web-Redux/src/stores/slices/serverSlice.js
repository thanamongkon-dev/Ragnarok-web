import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getServer = createAsyncThunk('server/getServer', async () => {
    try {
        const response = await axios.get('http://localhost/api/server_status');
        // response.data contains the parsed data already
        return response.data;
    } catch (error) {
        throw new Error('Get server failed');
    }
});

const serverSlice = createSlice({
    name : 'server',
    initialState : {
        server: null,
        status : 'idle',
        loading: false,
        error : null
    },
    reducers : {},

    extraReducers: (builder) => {
        builder
            .addCase(getServer.pending, (state) => {
                state.loading = true
            })
            .addCase(getServer.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.server = action.payload
            })
            .addCase(getServer.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default serverSlice.reducer