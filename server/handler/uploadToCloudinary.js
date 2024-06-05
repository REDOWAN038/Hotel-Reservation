const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (imageFiles, cloudFolder) => {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI, {
            folder: `${cloudFolder}`
        });
        return res.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
};

module.exports = {
    uploadToCloudinary
}