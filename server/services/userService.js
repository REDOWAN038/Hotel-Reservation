const createError = require("http-errors")

const userModel = require("../models/userModel")

// register user
const userRegister = async ({ email, password, firstName, lastName }) => {
    try {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            throw createError(409, "user already exists")
        }

        const newUser = { email, password, firstName, lastName }
        await userModel.create(newUser)
    } catch (error) {
        throw error
    }
}

module.exports = {
    userRegister
}