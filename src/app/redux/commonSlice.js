import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snackbar: {
        isOpen: false,
        color: 'primary',
        icon: '',
        content: '',
        bgWhite: true,
    }
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            state.snackbar.isOpen = true;
            state.snackbar.color = action.payload.color;
            state.snackbar.icon = action.payload.icon;
            state.snackbar.content = action.payload.content;
        },
        closeSnackbar: (state) => {
            state.snackbar.isOpen = false;
            state.snackbar.color = 'primary';
            state.snackbar.icon = '';
            state.snackbar.content = '';
        }
    }
});

export const {
    openSnackbar,
    closeSnackbar,
} = commonSlice.actions;

export const commonReducer = commonSlice.reducer;