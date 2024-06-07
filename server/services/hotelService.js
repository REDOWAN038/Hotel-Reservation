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
const getHotels = async (userId, page, limit) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const hotels = await hotelModel.find({
            owner: userId
        })
            .limit(limit)
            .skip((page - 1) * limit)

        const totalHotels = await hotelModel.find({ owner: userId }).countDocuments()

        return {
            hotels,
            pagination: {
                totalPages: Math.ceil(totalHotels / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(totalHotels / limit) ? page + 1 : null
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    addHotel,
    getHotels
}