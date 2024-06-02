const createError = require("http-errors")
const bcrypt = require("bcryptjs")

const userModel = require("../models/userModel")

// user login
const userLogin = async ({ email, password }) => {
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            throw createError(404, "user with this email does not registered. please register")
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            throw createError(401, "wrong password. try again!!!")
        }


        const userWithOutPassword = user.toObject()
        delete userWithOutPassword.password

        return userWithOutPassword
    } catch (error) {
        throw error
    }
}

module.exports = {
    userLogin
}