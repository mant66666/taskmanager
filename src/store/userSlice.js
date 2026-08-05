import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser as getCurrentUserApi } from '../api/getCurrentUser';
import { logOutCurrentUser as logOutCurrentUserApi } from '../api/logoutUser';

export const fetchUserThunk = createAsyncThunk(
    'api/me',
    async () => {
        return getCurrentUserApi();
    }
);

export const logoutUserThunk = createAsyncThunk(
    'api/logout',
    async () => {
        return logOutCurrentUserApi();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(logoutUserThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logoutUserThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = null;
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
