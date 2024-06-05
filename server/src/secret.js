require("dotenv").config()
const port = process.env.SERVER_PORT || 5000
const mongoURL = process.env.MONGO_URL
const jwtAccessKey = process.env.JWT_ACESS_KEY
const cloudName = process.env.CLOUDINARY_NAME
const cloudApiKey = process.env.CLOUDINARY_API_KEY
const cloudSecretKey = process.env.CLOUDINARY_SECRET_KEY
const cloudFolder = process.env.CLOUDINARY_FOLDER


module.exports = {
    port,
    mongoURL,
    jwtAccessKey,
    cloudName,
    cloudApiKey,
    cloudSecretKey,
    cloudFolder
}