const express = require("express")
const { handleGetSearchHotels, handleGetHotel, handleGetHotels } = require("../controllers/hotelController")
const router = express.Router()

// get  hotels
router.get("/", handleGetHotels)

// get search hotels
router.get("/search", handleGetSearchHotels)

// get single hotel
router.get("/:id", handleGetHotel)



module.exports = router