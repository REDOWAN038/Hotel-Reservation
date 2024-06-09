const express = require("express")
const { handleGetSearchHotels } = require("../controllers/hotelController")
const router = express.Router()

// get search hotels
router.get("/", handleGetSearchHotels)

module.exports = router