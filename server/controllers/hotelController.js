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
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5

        const { hotels, pagination } = await getHotels(req.user, page, limit)

        return successResponse(res, {
            statusCode: 200,
            message: "hotels returned successfully",
            payload: {
                hotels,
                pagination,
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