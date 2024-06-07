const express = require("express")
const { upload } = require("../middlewares/uploadImage")
const { isLoggedIn } = require("../middlewares/auth")
const { validateAddHotel } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleAddHotel, handleGetHotels } = require("../controllers/hotelController")
const router = express.Router()

// add hotel
router.post("/", upload.array("imageFiles", 6), isLoggedIn, validateAddHotel, runValidation, handleAddHotel)

// get hotels
router.get("/", isLoggedIn, handleGetHotels)

module.exports = router