const { successResponse } = require("../handler/responseHandler");
const { createRoom, getRooms, getSingleRoom, updateRoom, getAllRooms, deleteRoom, roomBookingPaymentIntent, bookingRoom, getSingleHotelRoom } = require("../services/roomService");

// create room
const handleCreateRoom = async (req, res, next) => {
    try {
        const room = await createRoom(req.body, req.admin)
        return successResponse(res, {
            statusCode: 201,
            message: "room created successfully",
            payload: {
                room
            }
        })
    } catch (error) {
        next(error)
    }
}

// get rooms
const handleGetRooms = async (req, res, next) => {
    try {
        const rooms = await getRooms(req.params.hotelId, req.admin)
        return successResponse(res, {
            statusCode: 200,
            message: "rooms returned successfully",
            payload: {
                rooms,
            }
        })
    } catch (error) {
        next(error)
    }
}

// get all rooms
const handleGetAllRooms = async (req, res, next) => {
    try {
        const rooms = await getAllRooms(req.admin)
        return successResponse(res, {
            statusCode: 200,
            message: "all rooms returned successfully",
            payload: {
                rooms,
            }
        })
    } catch (error) {
        next(error)
    }
}

// get single room
const handleGetSingleRoom = async (req, res, next) => {
    try {
        const room = await getSingleRoom(req.params.roomId, req.user)
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

// get single room
const handleGetSingleHotelRoom = async (req, res, next) => {
    try {
        const room = await getSingleHotelRoom(req.params.roomId, req.admin)
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

// update hotel
const handleUpdateRoom = async (req, res, next) => {
    try {
        const room = await updateRoom(req.params.roomId, req.body, req.admin)
        return successResponse(res, {
            statusCode: 201,
            message: "room updated successfully",
            payload: {
                room
            }
        })
    } catch (error) {
        next(error)
    }
}

// delete room
const handleDeleteRoom = async (req, res, next) => {
    try {
        await deleteRoom(req.params.roomId, req.params.hotelId, req.admin)
        return successResponse(res, {
            statusCode: 200,
            message: "room deleted successfully",
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
    handleCreateRoom,
    handleGetRooms,
    handleGetSingleRoom,
    handleUpdateRoom,
    handleGetAllRooms,
    handleDeleteRoom,
    handleRoomBookingPaymentIntent,
    handleBookingRoom,
    handleGetSingleHotelRoom
}