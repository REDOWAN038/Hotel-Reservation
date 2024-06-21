const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { handleGetBookings } = require("../controllers/bookingsController")
const router = express.Router()

// get my bookings
router.get("/", isLoggedIn, handleGetBookings)

module.exports = router