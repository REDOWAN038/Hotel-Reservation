const express = require("express")
const { isAdminLoggedIn } = require("../middlewares/auth")
const { handleGetMyBookings } = require("../controllers/myBookingsController")
const router = express.Router()

// get my bookings
router.get("/", isAdminLoggedIn, handleGetMyBookings)

module.exports = router