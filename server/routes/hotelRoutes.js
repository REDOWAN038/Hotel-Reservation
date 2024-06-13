const express = require("express")
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth")
const { handleGetSearchHotels, handleGetHotel, handleHotelBookingPaymentIntent, handleBookingHotel, handleGetHotels } = require("../controllers/hotelController")
const router = express.Router()

// get  hotels
router.get("/", handleGetHotels)

// get search hotels
router.get("/search", handleGetSearchHotels)

// get single hotel
router.get("/:id", handleGetHotel)

// hotel booking payment intent
router.post("/booking/payment-intent/:id", isLoggedIn, handleHotelBookingPaymentIntent)

// hotel booking 
router.post("/booking/:id", isLoggedIn, handleBookingHotel)



module.exports = router