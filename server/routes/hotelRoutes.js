const express = require("express")
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth")
const { handleGetSearchHotels, handleGetHotel, handleHotelBookingPaymentIntent, handleBookingHotel } = require("../controllers/hotelController")
const router = express.Router()

// get search hotels
router.get("/", handleGetSearchHotels)

// get single hotel
router.get("/:id", handleGetHotel)

// hotel booking payment intent
router.post("/booking/payment-intent/:id", isLoggedIn, handleHotelBookingPaymentIntent)

// hotel booking 
router.post("/booking/:id", isLoggedIn, handleBookingHotel)



module.exports = router