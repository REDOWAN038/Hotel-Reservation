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
// const getSearchHotels = async (page, limit, queryParams) => {
//     try {
//         const query = constructQuery(queryParams)
//         let sortOptions = {};
//         switch (queryParams.sortOption) {
//             case "starRating":
//                 sortOptions = { starRating: -1 };
//                 break;
//             case "pricePerNightAsc":
//                 sortOptions = { pricePerNight: 1 };
//                 break;
//             case "pricePerNightDesc":
//                 sortOptions = { pricePerNight: -1 };
//                 break;
//         }
//         const hotels = await hotelModel
//             .find(query)
//             .sort(sortOptions)
//             .limit(limit)
//             .skip((page - 1) * limit)

//         const totalHotels = await hotelModel.find(query).countDocuments()
//         return {
//             hotels,
//             pagination: {
//                 totalHotels,
//                 currentPage: page,
//                 totalPages: Math.ceil(totalHotels / limit)
//             }
//         }
//     } catch (error) {
//         throw error
//     }
// }

// get search hotels
const getSearchHotels = async (page, limit, queryParams) => {
    try {
        const query = constructQuery(queryParams);

        let sortOptions = {};
        switch (queryParams.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { minimumPricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { minimumPricePerNight: -1 };
                break;
            default:
                sortOptions = { starRating: -1 }; // Default sorting by starRating
                break;
        }

        // Base aggregation pipeline to filter and count matching rooms
        const basePipeline = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: 'rooms', // collection name in MongoDB
                    localField: '_id',
                    foreignField: 'hotelId',
                    as: 'rooms'
                }
            },
            {
                $addFields: {
                    matchingRooms: {
                        $filter: {
                            input: '$rooms',
                            as: 'room',
                            cond: {
                                $and: [
                                    { $gte: ['$$room.adultCount', parseInt(queryParams.adultCount, 10)] },
                                    { $gte: ['$$room.childCount', parseInt(queryParams.childCount, 10)] },
                                    { $eq: ['$$room.availability', true] }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    matchingRoomsCount: { $size: '$matchingRooms' }
                }
            },
            {
                $match: { matchingRoomsCount: { $gt: 0 } }
            }
        ];

        // Pipeline to count total hotels
        const countPipeline = [
            ...basePipeline,
            {
                $count: "totalHotels"
            }
        ];

        // Get total count of hotels that match the criteria
        const countResult = await hotelModel.aggregate(countPipeline);
        const totalHotels = countResult.length > 0 ? countResult[0].totalHotels : 0;

        // Pipeline to fetch paginated results
        const resultPipeline = [
            ...basePipeline,
            {
                $sort: sortOptions
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
            {
                $project: {
                    name: 1,
                    city: 1,
                    country: 1,
                    description: 1,
                    type: 1,
                    facilities: 1,
                    minimumPricePerNight: 1,
                    availableRooms: 1,
                    starRating: 1,
                    imageUrls: 1,
                    bookings: 1,
                    matchingRooms: 1,
                    matchingRoomsCount: 1
                }
            }
        ];

        const hotels = await hotelModel.aggregate(resultPipeline);

        return {
            hotels,
            pagination: {
                totalHotels,
                currentPage: page,
                totalPages: Math.ceil(totalHotels / limit)
            }
        };
    } catch (error) {
        throw new Error(`Error fetching hotels: ${error.message}`);
    }
};


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