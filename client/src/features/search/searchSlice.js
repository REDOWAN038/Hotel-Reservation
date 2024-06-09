import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(),
    adultCount: 1,
    childCount: 0,
    hotelId: ""
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setAll: (state, action) => {
            const { destination, checkIn, checkOut, adultCount, childCount } = action.payload
            state.destination = destination
            state.checkIn = checkIn
            state.checkOut = checkOut
            state.adultCount = adultCount
            state.childCount = childCount
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setCheckIn: (state, action) => {
            state.checkIn = action.payload
        },
        setCheckOut: (state, action) => {
            state.checkOut = action.payload
        },
        setAdultCount: (state, action) => {
            state.adultCount = action.payload
        },
        setChildCount: (state, action) => {
            state.childCount = action.payload
        },
        setHotelId: (state, action) => {
            state.hotelId = action.payload
        },
    },
});

export const { setAll, setDestination, setCheckIn, setCheckOut, setAdultCount, setChildCount, setHotelId } = searchSlice.actions;

export default searchSlice.reducer;
