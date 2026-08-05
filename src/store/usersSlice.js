import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsers as getUsersApi } from '../api/getUsers';

export const fetchUsersThunk = createAsyncThunk(
    'users/fetch',
    async (userId) => {
        return getUsersApi(userId);
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchUsersThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});
export default usersSlice.reducer;
