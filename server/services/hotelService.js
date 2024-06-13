const createError = require("http-errors")
const Stripe = require("stripe")

const hotelModel = require("../models/hotelModel")
const bookingModel = require("../models/bookingModel")
const { constructQuery } = require("../handler/constructQuery")
const { stripeSecretKey } = require("../src/secret")

const stripe = new Stripe(stripeSecretKey)

// get hotels
const getHotels = async () => {
    try {
        const hotels = await hotelModel.find().sort({ updatedAt: -1 })
        return hotels
    } catch (error) {
        throw error
    }
}

// get search hotels
const getSearchHotels = async (page, limit, queryParams) => {
    try {
        const query = constructQuery(queryParams)
        let sortOptions = {};
        switch (queryParams.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }
        const hotels = await hotelModel
            .find(query)
            .sort(sortOptions)
            .limit(limit)
            .skip((page - 1) * limit)
        const totalHotels = await hotelModel.find(query).countDocuments()
        return {
            hotels,
            pagination: {
                totalHotels,
                currentPage: page,
                totalPages: Math.ceil(totalHotels / limit)
            }
        }
    } catch (error) {
        throw error
    }
}

// get single hotel details
const getHotel = async (id) => {
    try {
        const hotel = await hotelModel.findById(id)
        if (!hotel) {
            throw createError(404, "no hotel found")
        }
        return hotel
    } catch (error) {
        throw error
    }
}

// hotel booking payment intent
const hotelBookingPaymentIntent = async (hotelId, userId, numberOfNights) => {
    try {
        const hotel = await hotelModel.findById(hotelId)
        if (!hotel) {
            throw createError(404, "no hotel found")
        }

        const totalCost = hotel.pricePerNight * numberOfNights;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost * 100,
            currency: "usd",
            metadata: {
                hotelId,
                userId
            },
        });

        if (!paymentIntent.client_secret) {
            throw Error("error while creating payment intent...")
        }

        const paymentIntentId = paymentIntent.id
        const clientSecret = paymentIntent.client_secret.toString()

        return {
            paymentIntentId,
            clientSecret,
            totalCost,
        }
    } catch (error) {
        throw error
    }
}

// booking hotel
const bookingHotel = async (hotelId, userId, newBooking) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(newBooking.paymentIntentId);

        if (!paymentIntent) {
            throw createError(404, "payment intent not found")
        }

        if (
            paymentIntent.metadata.hotelId !== hotelId ||
            paymentIntent.metadata.userId !== userId
        ) {
            throw createError(400, "payment intent mismatch")
        }

        if (paymentIntent.status !== "succeeded") {
            throw createError(400, `payment intent not succeeded. Status: ${paymentIntent.status}`)
        }

        newBooking.userId = userId

        const booking = await bookingModel.create(newBooking)

        const hotel = await hotelModel.findByIdAndUpdate(
            hotelId,
            {
                $push: { bookings: booking },
            }
        );

        if (!hotel) {
            throw createError(404, "no hotel found")
        }

        await hotel.save();
    } catch (error) {
        throw error
    }
}

module.exports = {
    getSearchHotels,
    getHotel,
    hotelBookingPaymentIntent,
    bookingHotel,
    getHotels
}