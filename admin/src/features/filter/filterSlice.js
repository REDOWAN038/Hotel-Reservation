import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stars: [],
    hotelTypes: [],
    facilities: [],
    maxPrice: "",
    sortOption: ""
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setStars: (state, action) => {
            state.stars = action.payload
        },
        setHotelTypes: (state, action) => {
            state.hotelTypes = action.payload
        },
        setFacilities: (state, action) => {
            state.facilities = action.payload
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload
        },
        setSortOption: (state, action) => {
            state.sortOption = action.payload
        },
    },
});

export const { setStars, setHotelTypes, setFacilities, setMaxPrice, setSortOption } = filterSlice.actions;

export default filterSlice.reducer;
