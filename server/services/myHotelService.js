const createError = require("http-errors")
const mongoose = require('mongoose');

const userModel = require("../models/userModel")
const hotelModel = require("../models/hotelModel")
const { cloudFolder } = require("../src/secret")
const { uploadToCloudinary } = require("../handler/uploadToCloudinary")
const bookingModel = require("../models/bookingModel")
const roomModel = require("../models/roomModel")

// add hotel
const addHotel = async (newHotel, imageFiles, userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const imageUrls = await uploadToCloudinary(imageFiles, cloudFolder);
        newHotel.imageUrls = imageUrls
        newHotel.owner = userId


        const hotel = await hotelModel.create(newHotel)
        return hotel
    } catch (error) {
        throw error
    }
}

// get hotels
const getHotels = async (userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const hotels = await hotelModel.find({
            owner: userId
        })
            .sort({ updatedAt: -1 })

        return hotels
    } catch (error) {
        throw error
    }
}

// get single hotel
const getSingleHotel = async (hotelId, userId) => {
    try {
        const hotel = await hotelModel.findOne({
            _id: hotelId,
            owner: userId
        }).populate("rooms")

        if (!hotel) {
            throw createError(404, "no hotel found")
        }
        return hotel
    } catch (error) {
        throw error
    }
}

// update hotel
const updateHotel = async (hotelId, updatedHotel, imageFiles, userId) => {
    try {
        const hotel = await hotelModel.findOneAndUpdate(
            {
                _id: hotelId,
                owner: userId
            },
            updatedHotel,
            { new: true }
        )

        if (!hotel) {
            throw createError(404, "no hotel found")
        }

        const updatedImageUrls = await uploadToCloudinary(imageFiles, cloudFolder)
        hotel.imageUrls = ([...updatedImageUrls, ...(updatedHotel.imageUrls || [])])

        await hotel.save()
        return hotel
    } catch (error) {
        throw error
    }
}

const deleteHotel = async (hotelId, userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const hotel = await hotelModel.findOne({
            _id: hotelId,
            owner: userId
        }).session(session)

        if (!hotel) {
            throw createError(404, "hotel not found")
        }

        if (hotel.rooms.length !== hotel.availableRooms) {
            throw createError(405, "some rooms are currently booked");
        }

        await bookingModel.deleteMany({ hotelId }).session(session);
        await roomModel.deleteMany({ hotelId }).session(session);
        await hotelModel.deleteOne({
            _id: hotelId,
            owner: userId
        }).session(session);

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

module.exports = {
    addHotel,
    getHotels,
    getSingleHotel,
    updateHotel,
    deleteHotel
}