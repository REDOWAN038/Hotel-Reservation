const createError = require("http-errors")
const { successResponse } = require("../handler/responseHandler");
const bookingModel = require("../models/bookingModel");
const hotelModel = require("../models/hotelModel");

// get my bookings
const handleGetMyBookings = async (req, res, next) => {
    try {
        const hotels = await hotelModel.find({
            owner: req.admin
        });

        const hotelIds = hotels.map(hotel => hotel._id);

        const bookings = await bookingModel.find({ hotelId: { $in: hotelIds } })
            .populate("hotelId")
            .populate("roomId")
            .populate("userId")
            .sort({ updatedAt: -1 });

        return successResponse(res, {
            statusCode: 200,
            message: "My bookings fetched successfully",
            payload: {
                bookings
            }
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    handleGetMyBookings
}