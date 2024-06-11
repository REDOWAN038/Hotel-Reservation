const createError = require("http-errors")

const hotelModel = require("../models/hotelModel")
const { constructQuery } = require("../handler/constructQuery")

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

module.exports = {
    getSearchHotels
}