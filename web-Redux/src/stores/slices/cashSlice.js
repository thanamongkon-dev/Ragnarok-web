import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCash = createAsyncThunk('cash/getCash', async () => {
    try {
        const response = await axios.get('http://localhost/api/getCash.php?accountId=2000000');
        // response.data contains the parsed data already
        return response.data;
    } catch (error) {
        throw new Error('Get cash failed');
    }
});

const cashSlice = createSlice({
    name : 'cash',
    initialState : {
        cash: null,
        bonus: null,
        status : 'idle',
        loading: false,
        error : null
    },
    reducers : {},
    extraReducers: (builder) => {
        builder
            .addCase(getCash.pending, (state) => {
                state.loading = true
            })
            .addCase(getCash.fulfilled, (state, action) => {
                state.loading = false
                state.status = 'succeeded'
                state.cash = action.payload.Cash
                state.bonus = action.payload.Bonus
            })
            .addCase(getCash.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default cashSlice.reducer