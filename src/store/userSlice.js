import { createSlice } from '@reduxjs/toolkit';

function getSavedUser() {
    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch (error) {
        localStorage.removeItem('user');
        return null;
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: getSavedUser(),
    },
    reducers: {
        login(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        logout(state) {
            localStorage.removeItem('user');
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
