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
    facilities: [
        {
            type: String,
            required: true
        }
    ],
    minimumPricePerNight: {
        type: Number,
        required: true
    },
    availableRooms: {
        type: Number,
        required: true,
        default: 0
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
    ],
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model("Hotel", hotelSchema)