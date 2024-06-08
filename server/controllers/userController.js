const { successResponse } = require("../handler/responseHandler")
const { userRegister } = require("../services/userService")

const handleUserRegistration = async (req, res, next) => {
    try {
        await userRegister(req.body)
        return successResponse(res, {
            statusCode: 201,
            message: "user registered successfully",
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleUserRegistration
}