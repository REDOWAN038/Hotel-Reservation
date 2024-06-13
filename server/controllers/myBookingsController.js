const createError = require("http-errors")
const { successResponse } = require("../handler/responseHandler");
const bookingModel = require("../models/bookingModel");

// get my bookings
const handleGetMyBookings = async (req, res, next) => {
    try {
        const bookings = await bookingModel.find({ userId: req.user })
            .populate("hotelId")
            .sort({ updatedAt: -1 })
        return successResponse(res, {
            statusCode: 200,
            message: "my bookings fetched successful",
            payload: {
                bookings
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleGetMyBookings
}