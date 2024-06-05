const mongoose = require("mongoose")

const hotelSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
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
    facilities: [
        {
            type: String,
            required: true
        }
    ],
    pricePerNight: {
        type: Number,
        required: true
    },
    starRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    imageUrls: [
        {
            type: String,
            required: true
        }
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model("Hotel", hotelSchema)