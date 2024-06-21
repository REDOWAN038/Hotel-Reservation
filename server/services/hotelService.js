const createError = require("http-errors")

const hotelModel = require("../models/hotelModel")
const { constructQuery } = require("../handler/constructQuery")


// get hotels
const getHotels = async () => {
    try {
        const hotels = await hotelModel.find({ availableRooms: { $gte: 1 } }).sort({ updatedAt: -1 });
        return hotels
    } catch (error) {
        throw error
    }
}

// get search hotels
const getSearchHotels = async (page, limit, queryParams) => {
    try {
        const query = constructQuery(queryParams)
        let sortOptions = {};
        switch (queryParams.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }
        const hotels = await hotelModel
            .find(query)
            .sort(sortOptions)
            .limit(limit)
            .skip((page - 1) * limit)

        const totalHotels = await hotelModel.find(query).countDocuments()
        return {
            hotels,
            pagination: {
                totalHotels,
                currentPage: page,
                totalPages: Math.ceil(totalHotels / limit)
            }
        }
    } catch (error) {
        throw error
    }
}

// get single hotel details
const getHotel = async (id) => {
    try {
        const hotel = await hotelModel.findById(id).populate("rooms")
        if (!hotel) {
            throw createError(404, "no hotel found")
        }
        return hotel
    } catch (error) {
        throw error
    }
}

module.exports = {
    getSearchHotels,
    getHotel,
    getHotels
}