import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    destination: sessionStorage.getItem('destination') || "",
    checkIn: sessionStorage.getItem('checkIn') || new Date().toISOString(),
    checkOut: sessionStorage.getItem('checkOut') || new Date().toISOString(),
    adultCount: sessionStorage.getItem('adultCount') || 1,
    childCount: sessionStorage.getItem('childCount') || 0,
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

            sessionStorage.setItem('destination', destination);
            sessionStorage.setItem('checkIn', checkIn);
            sessionStorage.setItem('checkOut', checkOut);
            sessionStorage.setItem('adultCount', adultCount);
            sessionStorage.setItem('childCount', childCount);

        },
        setDestination: (state, action) => {
            state.destination = action.payload
            sessionStorage.setItem('destination', action.payload);
        },
        setCheckIn: (state, action) => {
            state.checkIn = action.payload
            sessionStorage.setItem('checkIn', action.payload);
        },
        setCheckOut: (state, action) => {
            state.checkOut = action.payload
            sessionStorage.setItem('checkOut', action.payload);
        },
        setAdultCount: (state, action) => {
            state.adultCount = action.payload
            sessionStorage.setItem('adultCount', action.payload);
        },
        setChildCount: (state, action) => {
            state.childCount = action.payload
            sessionStorage.setItem('childCount', action.payload);
        },
        setHotelId: (state, action) => {
            state.hotelId = action.payload
        },
    },
});

export const { setAll, setDestination, setCheckIn, setCheckOut, setAdultCount, setChildCount, setHotelId } = searchSlice.actions;

export default searchSlice.reducer;
