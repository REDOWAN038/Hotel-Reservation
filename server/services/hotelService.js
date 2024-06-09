const createError = require("http-errors")

const hotelModel = require("../models/hotelModel")

// get search hotels
const getSearchHotels = async (page, limit) => {
    try {
        const hotels = await hotelModel.find().limit(limit).skip((page - 1) * limit)
        const totalHotels = await hotelModel.find().countDocuments()
        return {
            hotels,
            pagination: {
                totalHotels,
                currentPage: page,
                totalPages: Math.ceil(totalHotels / limit),
                // previousPage: page - 1 > 0 ? page - 1 : null,
                // nextPage: page + 1 <= Math.ceil(totalHotels / limit) ? page + 1 : null
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    getSearchHotels
}