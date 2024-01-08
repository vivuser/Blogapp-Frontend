import { createSlice } from '@reduxjs/toolkit';

const storedUserData = JSON.parse(localStorage.getItem('userData')) ;   

const initialState = {
    isAuthenticated: storedUserData !== null,
    userData: storedUserData || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('userData', JSON.stringify(action.payload));
            state.isAuthenticated = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('userData');
            state.isAuthenticated = false;
            state.userData = null;
        },
    },
});

export const  { login, logout } = authSlice.actions;
export default authSlice.reducer;