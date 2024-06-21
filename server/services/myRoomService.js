const createError = require("http-errors")
const mongoose = require('mongoose');

const userModel = require("../models/userModel")
const hotelModel = require("../models/hotelModel")
const roomModel = require("../models/roomModel")
const bookingModel = require("../models/bookingModel")


// create room
const createRoom = async (newRoom, userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await userModel.findById(userId).session(session);

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const hotel = await hotelModel.findOne({
            _id: newRoom.hotelId,
            owner: userId
        }).session(session);

        if (!hotel) {
            throw createError(404, "no hotel found")
        }

        newRoom.checkIn = new Date().toISOString()
        newRoom.checkOut = new Date().toISOString()
        newRoom.owner = userId

        const [room] = await roomModel.create([newRoom], { session });

        await hotelModel.findByIdAndUpdate(
            newRoom.hotelId,
            {
                $push: { rooms: room._id },
                $inc: { availableRooms: 1 }
            },
            { session }
        );

        await session.commitTransaction();
        return room
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
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
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (updatedRoom.availability && updatedRoom.availability === "true") {
            updatedRoom.checkIn = new Date().toISOString();
            updatedRoom.checkOut = new Date().toISOString();

            const room = await roomModel.findById(roomId).session(session);

            if (!room) {
                throw createError(404, "Room not found");
            }

            await hotelModel.findByIdAndUpdate(
                room.hotelId,
                { $inc: { availableRooms: 1 } },
                { new: true, session }
            );
        }

        const room = await roomModel.findOneAndUpdate(
            { _id: roomId, owner: userId },
            updatedRoom,
            { new: true, session }
        );

        if (!room) {
            throw createError(404, "No room found");
        }

        await session.commitTransaction();
        return room;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

// delete room
const deleteRoom = async (roomId, userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const room = await roomModel.findOne({
            _id: roomId,
            owner: userId,
        }).session(session);

        if (!room) {
            throw createError(404, "Room not found or you do not have permission to delete this room");
        }

        if (room.availability === false) {
            throw createError(405, "Requested room is currently booked");
        }

        await hotelModel.findByIdAndUpdate(
            room.hotelId,
            {
                $pull: { rooms: room._id },
                $inc: { availableRooms: -1 }
            },
            { session }
        );

        await bookingModel.deleteMany({ roomId }).session(session);

        const deletedRoom = await roomModel.findOneAndDelete({
            _id: roomId,
            owner: userId,
        }).session(session);

        if (!deletedRoom) {
            throw createError(404, "No room found");
        }

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};


module.exports = {
    createRoom,
    getSingleRoom,
    updateRoom,
    getAllRooms,
    deleteRoom,
}