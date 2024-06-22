const { successResponse } = require("../handler/responseHandler");
const { getSingleRoom, roomBookingPaymentIntent, bookingRoom } = require("../services/roomService");


// get single room
const handleGetSingleRoom = async (req, res, next) => {
    try {
        const room = await getSingleRoom(req.params.id)
        return successResponse(res, {
            statusCode: 200,
            message: "single room returned successfully",
            payload: {
                room
            }
        })
    } catch (error) {
        next(error)
    }
}

// room booking payment intent
const handleRoomBookingPaymentIntent = async (req, res, next) => {
    try {
        const roomId = req.params.id
        console.log(roomId);
        const { numberOfNights } = req.body
        const { paymentIntentId, clientSecret, totalCost } = await roomBookingPaymentIntent(roomId, req.user, numberOfNights)
        return successResponse(res, {
            statusCode: 200,
            message: "room booking payment intent successful",
            payload: {
                paymentIntentId,
                clientSecret,
                totalCost
            }
        })
    } catch (error) {
        next(error)
    }
}

// booking room
const handleBookingRoom = async (req, res, next) => {
    try {
        const { hotelId, roomId } = req.params
        await bookingRoom(roomId, hotelId, req.user, req.body)
        return successResponse(res, {
            statusCode: 200,
            message: "room booking successful",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleGetSingleRoom,
    handleBookingRoom,
    handleRoomBookingPaymentIntent
}