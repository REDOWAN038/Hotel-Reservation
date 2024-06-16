const { successResponse } = require("../handler/responseHandler");
const { createRoom, getRooms, getSingleRoom, updateRoom, getAllRooms, deleteRoom } = require("../services/roomService");

// create room
const handleCreateRoom = async (req, res, next) => {
    try {
        const room = await createRoom(req.body, req.user)
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
        const rooms = await getRooms(req.params.hotelId, req.user)
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
        const rooms = await getAllRooms(req.user)
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
        const hotel = await getSingleRoom(req.params.roomId, req.params.hotelId, req.user)
        return successResponse(res, {
            statusCode: 200,
            message: "single room returned successfully",
            payload: {
                hotel
            }
        })
    } catch (error) {
        next(error)
    }
}

// update hotel
const handleUpdateRoom = async (req, res, next) => {
    try {
        const room = await updateRoom(req.params.roomId, req.body, req.params.hotelId, req.user)
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
        await deleteRoom(req.params.roomId, req.params.hotelId, req.user)
        return successResponse(res, {
            statusCode: 200,
            message: "room deleted successfully",
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
    handleDeleteRoom
}