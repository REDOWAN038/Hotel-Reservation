const express = require("express")
const { isLoggedIn } = require("../middlewares/auth")
const { validateCreateRoom } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleCreateRoom, handleGetRooms, handleGetSingleRoom, handleGetAllRooms, handleUpdateRoom } = require("../controllers/roomController")
const router = express.Router()

// create room
router.post("/", isLoggedIn, validateCreateRoom, runValidation, handleCreateRoom)

// get all rooms
router.get("/", isLoggedIn, handleGetAllRooms)

// get rooms
router.get("/:hotelId", isLoggedIn, handleGetRooms)

// get single room
router.get("/:hotelId/:roomId", isLoggedIn, handleGetSingleRoom)

// update room
router.put("/:hotelId/:roomId", isLoggedIn, handleUpdateRoom)

module.exports = router