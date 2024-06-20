const createError = require("http-errors")

const userModel = require("../models/userModel")
const hotelModel = require("../models/hotelModel")
const roomModel = require("../models/roomModel")


// create room
const createRoom = async (newRoom, userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const hotel = await hotelModel.findOne({
            _id: newRoom.hotelId,
            owner: userId
        })

        if (!hotel) {
            throw createError(404, "no hotel found")
        }

        newRoom.checkIn = new Date().toISOString()
        newRoom.checkOut = new Date().toISOString()
        newRoom.owner = userId

        const room = await roomModel.create(newRoom)

        await hotelModel.findByIdAndUpdate(
            newRoom.hotelId,
            {
                $push: { rooms: room },
            }
        );

        return room
    } catch (error) {
        throw error
    }
}

// get all rooms
const getAllRooms = async (userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const rooms = await roomModel.find({ owner: userId }).populate("hotelId")
        return rooms
    } catch (error) {
        throw error
    }
}

// get rooms
const getRooms = async (hotelId, userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const rooms = await roomModel.find({ hotelId, owner: userId })
        return rooms
    } catch (error) {
        throw error
    }
}

// get single hotel room
const getSingleRoom = async (roomId, userId) => {
    try {
        const room = await roomModel.findOne({
            _id: roomId,
            owner: userId
        }).populate("hotelId")


        if (!room) {
            throw createError(404, "no room found")
        }
        return room
    } catch (error) {
        throw error
    }
}

// update room
const updateRoom = async (roomId, updatedRoom, userId) => {
    try {

        if (updatedRoom.availability && updatedRoom.availability === "true") {
            updatedRoom.checkIn = new Date().toISOString()
            updatedRoom.checkOut = new Date().toISOString()
        }

        const room = await roomModel.findOneAndUpdate(
            {
                _id: roomId,
                owner: userId,
            },
            updatedRoom,
            { new: true }
        )

        if (!room) {
            throw createError(404, "no room found")
        }

        return room
    } catch (error) {
        throw error
    }
}

// delete room
const deleteRoom = async (roomId, hotelId, userId) => {
    try {
        const room = await roomModel.findOneAndDelete({
            _id: roomId,
            owner: userId,
            hotelId
        })

        if (!room) {
            throw createError(404, "no room found")
        }

        await hotelModel.findByIdAndUpdate(
            hotelId,
            {
                $pull: { rooms: room },
            }
        );
    } catch (error) {
        throw error
    }
}

module.exports = {
    createRoom,
    getRooms,
    getSingleRoom,
    updateRoom,
    getAllRooms,
    deleteRoom,
}