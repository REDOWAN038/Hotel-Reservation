const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { handleGetMyBookings } = require("../controllers/myBookingsController")
const router = express.Router()

// get my bookings
router.get("/", isLoggedIn, handleGetMyBookings)

module.exports = router