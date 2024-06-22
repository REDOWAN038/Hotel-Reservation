const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { handleGetSingleRoom, handleRoomBookingPaymentIntent, handleBookingRoom } = require("../controllers/roomController")
const router = express.Router()

// get single room
router.get("/:id", handleGetSingleRoom)

// room booking payment intent
router.post("/booking/payment-intent/:id", isLoggedIn, handleRoomBookingPaymentIntent)


// room booking 
router.post("/booking/:hotelId/:roomId", isLoggedIn, handleBookingRoom)

module.exports = router