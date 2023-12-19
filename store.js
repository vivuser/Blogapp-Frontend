'use client'
import { createStore } from 'redux';

const storedUserData = JSON.parse(localStorage.getItem('userData'))

const initialState =  {
    isAuthenticated: storedUserData !== null,
    userData: storedUserData || null,
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                     ...state, 
                     isAuthenticated: true,
                     userData:action.payload };
        case 'LOGOUT':
            localStorage.removeItem('user')
            return { ...state, isAuthenticated: false, userData:null };

        default: 
            return state;
    }
};

const store = createStore(authReducer);

export default store;

