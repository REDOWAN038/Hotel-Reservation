const createError = require("http-errors")
const jwt = require("jsonwebtoken")
const { jwtAccessKey } = require("../src/secret")

const isLoggedIn = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        if (!accessToken) {
            throw createError(401, "user is not logged in")
        }

        const decoded = jwt.verify(accessToken, jwtAccessKey)
        if (!decoded) {
            throw createError(401, "invalid token")
        }

        req.user = decoded.user._id
        next()
    } catch (error) {
        return next(error)
    }
}

const isLoggedOut = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, jwtAccessKey)
                if (decoded) {
                    throw createError(400, "user already logged in")
                }
            } catch (error) {
                throw error
            }
        }
        next()
    } catch (error) {
        return next(error)
    }
}

const isAdminLoggedIn = async (req, res, next) => {
    try {
        const adminAccessToken = req.cookies.adminAccessToken
        if (!adminAccessToken) {
            throw createError(401, "admin is not logged in")
        }

        const decoded = jwt.verify(adminAccessToken, jwtAccessKey)
        if (!decoded) {
            throw createError(401, "invalid token")
        }

        req.admin = decoded.user._id
        next()
    } catch (error) {
        return next(error)
    }
}

const isAdminLoggedOut = async (req, res, next) => {
    try {
        const adminAccessToken = req.cookies.adminAccessToken
        if (adminAccessToken) {
            try {
                const decoded = jwt.verify(adminAccessToken, jwtAccessKey)
                if (decoded) {
                    throw createError(400, "admin already logged in")
                }
            } catch (error) {
                throw error
            }
        }
        next()
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdminLoggedIn,
    isAdminLoggedOut
}