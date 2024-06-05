const createError = require("http-errors")

const { successResponse } = require("../handler/responseHandler");
const { addHotel } = require("../services/hotelService");

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

module.exports = {
    handleAddHotel
}