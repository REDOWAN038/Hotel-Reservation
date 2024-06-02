const { body } = require("express-validator")

// validate user registration input
const validateUserRegistration = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Emails is not valid"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Pasword is required"),

    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("first name is required")
        .isString()
        .withMessage("first name must be string"),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("last name is required")
        .isString()
        .withMessage("last name must be string"),
]



module.exports = {
    validateUserRegistration
}