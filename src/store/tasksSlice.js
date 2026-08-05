import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getTasks as getTasksApi } from '../api/getTasks';
import { createTask as createTaskApi } from '../api/createTask';
import { deleteTask as deleteTaskApi } from '../api/deleteTask';
import { updateTask as updateTaskApi } from '../api/updateTask';

export const fetchTasksThunk = createAsyncThunk(
    'tasks/fetch',
    async () => {
        return getTasksApi();
    }
);

export const createTaskThunk = createAsyncThunk(
    'tasks/create',
    async (task) => {
        return createTaskApi(task);
    }
);

export const deleteTaskThunk = createAsyncThunk(
    'tasks/delete',
    async (task) => {
        return deleteTaskApi(task);
    }
);

export const editTaskThunk = createAsyncThunk(
    'tasks/edit',
    async (task) => {
        return updateTaskApi(task);
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTasksThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createTaskThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createTaskThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(createTaskThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteTaskThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(deleteTaskThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editTaskThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editTaskThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(editTaskThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export default tasksSlice.reducer;
