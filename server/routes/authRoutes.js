const express = require("express")
const { isLoggedOut, isLoggedIn, isAdminLoggedOut, isAdminLoggedIn } = require("../middlewares/auth")
const { validateUserLogin } = require("../middlewares/validation")
const { runValidation } = require("../middlewares")
const { handleUserLogin, handleUserLogout, handleAdminLogout, handleAdminLogin } = require("../controllers/authController")
const router = express.Router()

// user logged in
router.post("/login", validateUserLogin, runValidation, isLoggedOut, handleUserLogin)

// user logged out
router.post("/logout", isLoggedIn, handleUserLogout)

// admin logged in
router.post("/admin/login", validateUserLogin, runValidation, isAdminLoggedOut, handleAdminLogin)

// admin logged out
router.post("/admin/logout", isAdminLoggedIn, handleAdminLogout)

module.exports = router