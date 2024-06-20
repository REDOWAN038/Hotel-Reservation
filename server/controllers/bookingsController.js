const { successResponse } = require("../handler/responseHandler");
const bookingModel = require("../models/bookingModel");
const hotelModel = require("../models/hotelModel");

// get my bookings
const handleGetBookings = async (req, res, next) => {
    try {
        const bookings = await bookingModel.find({ userId: req.user })
            .populate("hotelId")
            .populate("roomId")
            .sort({ updatedAt: -1 });

        return successResponse(res, {
            statusCode: 200,
            message: "bookings fetched successfully",
            payload: {
                bookings
            }
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    handleGetBookings
}