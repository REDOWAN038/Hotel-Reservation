const constructQuery = (queryParams) => {
    let constructedQuery = {};

    // constructedQuery.availableRooms = {
    //     $gte: 1,
    // };

    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }

    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
                ? queryParams.facilities
                : [queryParams.facilities],
        };
    }

    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }

    if (queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
            ? queryParams.stars.map((star) => parseInt(star, 10))
            : [parseInt(queryParams.stars, 10)];

        constructedQuery.starRating = { $in: starRatings };
    }

    if (queryParams.maxPrice) {
        constructedQuery.minimumPricePerNight = {
            $lte: parseInt(queryParams.maxPrice).toString(),
        };
    }

    return constructedQuery;
};

module.exports = {
    constructQuery
}