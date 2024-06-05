const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    booker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    adultCount: {
        type: Number,
        required: true
    },
    childCount: {
        type: Number,
        required: true
    },
    checkIn: {
        typeof: Date,
        required: true
    },
    checkOut: {
        typeof: Date,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
}, { timestamps: true })


module.exports = mongoose.model("Booking", bookingSchema)