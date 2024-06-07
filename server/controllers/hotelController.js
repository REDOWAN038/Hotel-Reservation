const createError = require("http-errors")

const { successResponse } = require("../handler/responseHandler");
const { addHotel, getHotels } = require("../services/hotelService");

// add hotel
const handleAddHotel = async (req, res, next) => {
    try {
        const hotel = await addHotel(req.body, req.files, req.user)
        return successResponse(res, {
            statusCode: 201,
            message: "hotel added successfully",
            payload: {
                hotel
            }
        })
    } catch (error) {
        next(error)
    }
}

// get hotels
const handleGetHotels = async (req, res, next) => {
    try {
        const hotels = await getHotels(req.user)
        return successResponse(res, {
            statusCode: 200,
            message: "hotels returned successfully",
            payload: {
                hotels,
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleAddHotel,
    handleGetHotels
}