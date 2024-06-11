const { successResponse } = require("../handler/responseHandler");
const { getSearchHotels, getHotel } = require("../services/hotelService");

// get search hotels
const handleGetSearchHotels = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const { hotels, pagination } = await getSearchHotels(page, limit, req.query)
        return successResponse(res, {
            statusCode: 200,
            message: "search hotels returned successfully",
            payload: {
                hotels,
                pagination,
            }
        })
    } catch (error) {
        next(error)
    }
}

// get hotel details
const handleGetHotel = async (req, res, next) => {
    try {
        const hotel = await getHotel(req.params.id)
        return successResponse(res, {
            statusCode: 200,
            message: "single hotel returned successfully",
            payload: {
                hotel
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleGetSearchHotels,
    handleGetHotel
}