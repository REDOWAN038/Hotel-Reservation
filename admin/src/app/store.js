import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import searchReducer from '../features/search/searchSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        filter: filterReducer,
    },
});
