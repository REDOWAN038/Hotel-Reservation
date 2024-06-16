const createError = require("http-errors")

const userModel = require("../models/userModel")
const hotelModel = require("../models/hotelModel")
const { cloudFolder } = require("../src/secret")
const { uploadToCloudinary } = require("../handler/uploadToCloudinary")

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

module.exports = {
    addHotel,
    getHotels,
    getSingleHotel,
    updateHotel
}