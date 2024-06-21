import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn: localStorage.getItem('isAdminLoggedIn') === 'true',
    user: JSON.parse(localStorage.getItem('admin')) || null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem('isAdminLoggedIn', 'true');
            localStorage.setItem('admin', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.setItem('isAdminLoggedIn', 'false');
            localStorage.removeItem('admin');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
