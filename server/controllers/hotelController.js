const { successResponse } = require("../handler/responseHandler");
const { getSearchHotels } = require("../services/hotelService");

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

module.exports = {
    handleGetSearchHotels
}