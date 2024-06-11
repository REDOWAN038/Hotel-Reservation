const express = require("express")
const { handleGetSearchHotels, handleGetHotel } = require("../controllers/hotelController")
const router = express.Router()

// get search hotels
router.get("/", handleGetSearchHotels)

// get single hotel
router.get("/:id", handleGetHotel)

module.exports = router