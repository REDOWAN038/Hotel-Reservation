const express = require("express")
const { isAdminLoggedIn } = require("../middlewares/auth")
const { validateCreateRoom } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleCreateRoom, handleGetAllRooms, handleUpdateRoom, handleDeleteRoom, handleGetSingleRoom } = require("../controllers/myRoomController")
const router = express.Router()

// create room
router.post("/", isAdminLoggedIn, validateCreateRoom, runValidation, handleCreateRoom)

// get all rooms
router.get("/", isAdminLoggedIn, handleGetAllRooms)

// get single hotel room
router.get("/:id", isAdminLoggedIn, handleGetSingleRoom)

// delete room
router.delete("/:id", isAdminLoggedIn, handleDeleteRoom)

// update room
router.put("/:id", isAdminLoggedIn, handleUpdateRoom)

module.exports = router