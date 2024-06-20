const createError = require("http-errors")
const Stripe = require("stripe")

const hotelModel = require("../models/hotelModel")
const roomModel = require("../models/roomModel")
const bookingModel = require("../models/bookingModel")
const { stripeSecretKey } = require("../src/secret")

const stripe = new Stripe(stripeSecretKey)

// get single room
const getSingleRoom = async (roomId) => {
    try {
        const room = await roomModel.findOne({
            _id: roomId,
        })


        if (!room) {
            throw createError(404, "no room found")
        }
        return room
    } catch (error) {
        throw error
    }
}

// room booking payment intent
const roomBookingPaymentIntent = async (roomId, userId, numberOfNights) => {
    try {
        const room = await roomModel.findById(roomId)
        if (!room) {
            throw createError(404, "no room found")
        }

        const totalCost = room.pricePerNight * numberOfNights;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost * 100,
            currency: "usd",
            metadata: {
                roomId,
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

// booking room
const bookingRoom = async (roomId, hotelId, userId, newBooking) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(newBooking.paymentIntentId);

        if (!paymentIntent) {
            throw createError(404, "payment intent not found")
        }

        if (
            paymentIntent.metadata.roomId !== roomId ||
            paymentIntent.metadata.userId !== userId
        ) {
            throw createError(400, "payment intent mismatch")
        }

        if (paymentIntent.status !== "succeeded") {
            throw createError(400, `payment intent not succeeded. Status: ${paymentIntent.status}`)
        }

        newBooking.userId = userId

        const booking = await bookingModel.create(newBooking)

        await roomModel.findByIdAndUpdate(
            roomId,
            {
                availability: false,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut
            }
        )

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
    getSingleRoom,
    bookingRoom,
    roomBookingPaymentIntent
}