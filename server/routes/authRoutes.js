const express = require("express")
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth")
const { validateUserLogin } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleUserLogin, handleUserLogout } = require("../controllers/authController")
const router = express.Router()

// user logged in
router.post("/login", validateUserLogin, runValidation, isLoggedOut, handleUserLogin)

// user logged out
router.post("/logout", isLoggedIn, handleUserLogout)

module.exports = router