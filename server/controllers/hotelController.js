const { successResponse } = require("../handler/responseHandler");
const { getSearchHotels, getHotel, hotelBookingPaymentIntent, bookingHotel, getHotels } = require("../services/hotelService");

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

// hotel booking payment intent
const handleHotelBookingPaymentIntent = async (req, res, next) => {
    try {
        const hotelId = req.params.id
        const { numberOfNights } = req.body
        const { paymentIntentId, clientSecret, totalCost } = await hotelBookingPaymentIntent(hotelId, req.user, numberOfNights)
        return successResponse(res, {
            statusCode: 200,
            message: "hotel booking payment intent successful",
            payload: {
                paymentIntentId,
                clientSecret,
                totalCost
            }
        })
    } catch (error) {
        next(error)
    }
}

// booking hotel
const handleBookingHotel = async (req, res, next) => {
    try {
        const hotelId = req.params.id
        await bookingHotel(hotelId, req.user, req.body)
        return successResponse(res, {
            statusCode: 200,
            message: "hotel booking successful",
        })
    } catch (error) {
        next(error)
    }
}

const handleGetHotels = async (req, res, next) => {
    try {

        const hotels = await getHotels()
        return successResponse(res, {
            statusCode: 200,
            message: "search hotels returned successfully",
            payload: {
                hotels,
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleGetSearchHotels,
    handleGetHotel,
    handleHotelBookingPaymentIntent,
    handleBookingHotel,
    handleGetHotels
}