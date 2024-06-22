const { successResponse } = require("../handler/responseHandler");
const { createRoom, updateRoom, getAllRooms, deleteRoom, getSingleRoom } = require("../services/myRoomService");

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
        const room = await getSingleRoom(req.params.id, req.admin)
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
        const room = await updateRoom(req.params.id, req.body, req.admin)
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
        await deleteRoom(req.params.id, req.admin)
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
    handleGetSingleRoom,
    handleUpdateRoom,
    handleGetAllRooms,
    handleDeleteRoom,
}