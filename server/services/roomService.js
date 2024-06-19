const createError = require("http-errors")
const Stripe = require("stripe")

const userModel = require("../models/userModel")
const hotelModel = require("../models/hotelModel")
const roomModel = require("../models/roomModel")
const bookingModel = require("../models/bookingModel")
const { stripeSecretKey } = require("../src/secret")

const stripe = new Stripe(stripeSecretKey)

// create room
const createRoom = async (newRoom, userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const hotel = await hotelModel.findOne({
            _id: newRoom.hotelId,
            owner: userId
        })

        if (!hotel) {
            throw createError(404, "no hotel found")
        }

        newRoom.checkIn = new Date().toISOString()
        newRoom.checkOut = new Date().toISOString()
        newRoom.owner = userId

        const room = await roomModel.create(newRoom)

        await hotelModel.findByIdAndUpdate(
            newRoom.hotelId,
            {
                $push: { rooms: room },
            }
        );

        return room
    } catch (error) {
        throw error
    }
}

// get all rooms
const getAllRooms = async (userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        const rooms = await roomModel.find({ owner: userId }).populate("hotelId")
        return rooms
    } catch (error) {
        throw error
    }
}


// get rooms
const getRooms = async (hotelId, userId) => {
    try {
        const user = await userModel.findById(userId)

        if (!user) {
            throw createError(404, "user does not exist")
        }

        // const hotel = await hotelModel.findOne({
        //     _id: hotelId,
        //     owner: userId
        // })

        // if (!hotel) {
        //     throw createError(404, "no room for that hotel is found")
        // }

        const rooms = await roomModel.find({ hotelId, owner: userId })
        return rooms
    } catch (error) {
        throw error
    }
}

// get single room
const getSingleRoom = async (roomId) => {
    try {
        // const hotel = await hotelModel.findOne({
        //     _id: hotelId,
        //     owner: userId
        // })

        // if (!hotel) {
        //     throw createError(404, "no room for that hotel is found")
        // }
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

// get single hotel room
const getSingleHotelRoom = async (roomId, userId) => {
    try {
        // const hotel = await hotelModel.findOne({
        //     _id: hotelId,
        //     owner: userId
        // })

        // if (!hotel) {
        //     throw createError(404, "no room for that hotel is found")
        // }
        const room = await roomModel.findOne({
            _id: roomId,
            owner: userId
        }).populate("hotelId")


        if (!room) {
            throw createError(404, "no room found")
        }
        return room
    } catch (error) {
        throw error
    }
}

// update room
const updateRoom = async (roomId, updatedRoom, userId) => {
    try {
        // const hotel = await hotelModel.findOne({
        //     _id: hotelId,
        //     owner: userId
        // })

        // if (!hotel) {
        //     throw createError(404, "no room for that hotel is found")
        // }

        if (updatedRoom.availability && updatedRoom.availability === "true") {
            updatedRoom.checkIn = new Date().toISOString()
            updatedRoom.checkOut = new Date().toISOString()
        }

        const room = await roomModel.findOneAndUpdate(
            {
                _id: roomId,
                owner: userId,
            },
            updatedRoom,
            { new: true }
        )

        if (!room) {
            throw createError(404, "no room found")
        }

        return room
    } catch (error) {
        throw error
    }
}

// delete room
const deleteRoom = async (roomId, hotelId, userId) => {
    try {
        // const hotel = await hotelModel.findOne({
        //     _id: hotelId,
        //     owner: userId
        // })

        // if (!hotel) {
        //     throw createError(404, "no room for that hotel is found")
        // }
        const room = await roomModel.findOneAndDelete({
            _id: roomId,
            owner: userId,
            hotelId
        })

        if (!room) {
            throw createError(404, "no room found")
        }

        await hotelModel.findByIdAndUpdate(
            hotelId,
            {
                $pull: { rooms: room },
            }
        );
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
    createRoom,
    getRooms,
    getSingleRoom,
    updateRoom,
    getAllRooms,
    deleteRoom,
    roomBookingPaymentIntent,
    bookingRoom,
    getSingleHotelRoom
}