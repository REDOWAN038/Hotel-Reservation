const express = require("express")
const createError = require('http-errors')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const app = express()

const userRoutes = require("../routes/userRoutes")
const authRoutes = require("../routes/authRoutes")
const myHotelRoutes = require("../routes/myHotelRoutes")
const hotelRoutes = require("../routes/hotelRoutes")
const myBookingsRoutes = require("../routes/myBookingsRoutes")
const roomRoutes = require("../routes/roomRoutes")


const { errorResponse } = require("../handler/responseHandler")

// middlewares
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)
    next();
});
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/my-hotels", myHotelRoutes)
app.use("/api/v1/hotels", hotelRoutes)
app.use("/api/v1/my-bookings", myBookingsRoutes)
app.use("/api/v1/rooms", roomRoutes)

app.get("/test", (req, res) => {
    res.status(200).json({
        message: "welcome to the server"
    })
})

// handling client error
app.use((req, res, next) => {
    createError(404, "route not found")
    next()
})

// handling server error
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})

module.exports = app