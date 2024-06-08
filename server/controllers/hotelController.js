const createError = require("http-errors")

const { successResponse } = require("../handler/responseHandler");
const { addHotel, getHotels, getSingleHotel, updateHotel } = require("../services/hotelService");

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

// get single hotel
const handleGetSingleHotel = async (req, res, next) => {
    try {
        const hotel = await getSingleHotel(req.params.id, req.user)
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

// update hotel
const handleUpdateHotel = async (req, res, next) => {
    try {
        const hotel = await updateHotel(req.params.id, req.body, req.files, req.user)
        return successResponse(res, {
            statusCode: 201,
            message: "hotel updated successfully",
            payload: {
                hotel
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleAddHotel,
    handleGetHotels,
    handleGetSingleHotel,
    handleUpdateHotel
}