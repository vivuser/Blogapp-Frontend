import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snackbar: {
        isOpen: false,
        color: 'primary',
        icon: '',
        content: '',
        autoHideDuration: 5000,
    }
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            state.snackbar.isOpen = true;
            state.snackbar.color = action.payload.color || initialState.snackbar.color;
            state.snackbar.icon = action.payload.icon || initialState.snackbar.icon;
            state.snackbar.content = action.payload.content;
            state.snackbar.autoHideDuration = 
                action.payload.autoHideDuration || initialState.snackbar.autoHideDuration;
        },
        closeSnackbar: (state) => {
            state.snackbar.isOpen = false;
            state.snackbar.content = '';
        }
    }
});

export const {
    openSnackbar,
    closeSnackbar,
} = commonSlice.actions;

export const commonReducer = commonSlice.reducer;