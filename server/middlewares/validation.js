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

// validate user login input
const validateUserLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Emails is not valid"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Pasword is required")
]

// validate add hotel
const validateAddHotel = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),

    body("country")
        .trim()
        .notEmpty()
        .withMessage("Country is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("type")
        .trim()
        .notEmpty()
        .withMessage("Type is required"),

    body("minimumPricePerNight")
        .notEmpty()
        .withMessage("pricePerNight is required")
        .isNumeric()
        .withMessage("pricePerNight must be a number"),

    body("starRating")
        .notEmpty()
        .withMessage("starRating is required")
        .isNumeric()
        .withMessage("starRating must be a number")
        .isLength({
            min: 1,
            max: 5
        })
        .withMessage("starRating must be between 1 and 5"),

    body("facilities")
        .notEmpty()
        .withMessage("facilities is required")
]

// validate create room
const validateCreateRoom = [
    body("type")
        .trim()
        .notEmpty()
        .withMessage("Type is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("pricePerNight")
        .notEmpty()
        .withMessage("pricePerNight is required")
        .isNumeric()
        .withMessage("pricePerNight must be a number"),

    body("adultCount")
        .notEmpty()
        .withMessage("adultCount is required")
        .isNumeric()
        .withMessage("adultCount must be a number"),

    body("childCount")
        .notEmpty()
        .withMessage("childCount is required")
        .isNumeric()
        .withMessage("childCount must be a number"),

]


module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateAddHotel,
    validateCreateRoom
}