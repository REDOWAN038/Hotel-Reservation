const express = require("express")
const { upload } = require("../middlewares/uploadImage")
const { isAdminLoggedIn } = require("../middlewares/auth")
const { validateAddHotel } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleAddHotel, handleGetHotels, handleGetSingleHotel, handleUpdateHotel, handleDeleteHotel } = require("../controllers/myHotelController")
const router = express.Router()

// add hotel
router.post("/", upload.array("imageFiles", 6), isAdminLoggedIn, validateAddHotel, runValidation, handleAddHotel)

// get hotels
router.get("/", isAdminLoggedIn, handleGetHotels)

// get single hotel
router.get("/:id", isAdminLoggedIn, handleGetSingleHotel)

// update hotel
router.put("/:id", upload.array("imageFiles", 6), isAdminLoggedIn, handleUpdateHotel)

// delete hotel
router.delete("/:id", isAdminLoggedIn, handleDeleteHotel)

module.exports = router