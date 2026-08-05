import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tasksReducer from './tasksSlice';
import usersReducer from './usersSlice';
export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksReducer,
        users: usersReducer,
    },
});