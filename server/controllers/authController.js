const { successResponse } = require("../handler/responseHandler")
const { userLogin } = require("../services/authService")
const { createJWT } = require("../handler/jwt")
const { jwtAccessKey } = require("../src/secret")

// user login
const handleUserLogin = async (req, res, next) => {
    try {
        const user = await userLogin(req.body)

        // creating access token and set up in cookies
        const accessToken = createJWT({ user }, jwtAccessKey, "1h")
        res.cookie("accessToken", accessToken, {
            maxAge: 60 * 60 * 1000,  // expires in 60 minutes
            // httpOnly: true,
            // sameSite: 'none',
        })

        return successResponse(res, {
            statusCode: 200,
            message: `welcome back, ${user.firstName} ${user.lastName}`,
            payload: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

// user logout
const handleUserLogout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken")
        return successResponse(res, {
            statusCode: 200,
            message: "logged out successfully",
        })
    } catch (error) {
        next(error)
    }
}

// admin login
const handleAdminLogin = async (req, res, next) => {
    try {
        const user = await userLogin(req.body)

        // creating access token and set up in cookies
        const adminAccessToken = createJWT({ user }, jwtAccessKey, "1h")
        res.cookie("adminAccessToken", adminAccessToken, {
            maxAge: 60 * 60 * 1000,  // expires in 60 minutes
            // httpOnly: true,
            // sameSite: 'none',
        })

        return successResponse(res, {
            statusCode: 200,
            message: `welcome back, ${user.firstName} ${user.lastName}`,
            payload: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

// admin logout
const handleAdminLogout = async (req, res, next) => {
    try {
        res.clearCookie("adminAccessToken")
        return successResponse(res, {
            statusCode: 200,
            message: "logged out successfully",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleUserLogin,
    handleUserLogout,
    handleAdminLogin,
    handleAdminLogout
}