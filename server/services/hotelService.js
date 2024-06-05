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

module.exports = {
    addHotel
}