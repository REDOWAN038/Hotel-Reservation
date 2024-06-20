const express = require("express")
const { isLoggedIn, isAdminLoggedIn } = require("../middlewares/auth")
const { validateCreateRoom } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleCreateRoom, handleGetRooms, handleGetSingleRoom, handleGetAllRooms, handleUpdateRoom, handleDeleteRoom, handleRoomBookingPaymentIntent, handleBookingRoom, handleGetSingleHotelRoom } = require("../controllers/roomController")
const router = express.Router()

// create room
router.post("/", isAdminLoggedIn, validateCreateRoom, runValidation, handleCreateRoom)

// get all rooms
router.get("/", isAdminLoggedIn, handleGetAllRooms)

// get rooms of a hotel
// router.get("/hotel-rooms/:hotelId", isLoggedIn, handleGetRooms)

// get single hotel room
router.get("/hotel-room/:roomId", isAdminLoggedIn, handleGetSingleHotelRoom)

// get single room
router.get("/:roomId", isLoggedIn, handleGetSingleRoom)

// delete room
router.delete("/:hotelId/:roomId", isAdminLoggedIn, handleDeleteRoom)

// update room
router.put("/:roomId", isAdminLoggedIn, handleUpdateRoom)


// room booking payment intent
router.post("/booking/payment-intent/:id", isLoggedIn, handleRoomBookingPaymentIntent)


// room booking 
router.post("/booking/:hotelId/:roomId", isLoggedIn, handleBookingRoom)

module.exports = router