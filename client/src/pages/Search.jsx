import { useSelector } from "react-redux"
import { selectAll } from "../features/search/selector"
import axios from "axios"
import { useEffect, useState } from "react"
import SearchHotelsCard from "../components/SearchHotelsCard"
import Pagination from "../components/Pagination"
import StarRatingFilter from "../components/StarRatingFilter"
import HotelTypesFilter from "../components/HotelTypesFilter"
import FacilitiesFilter from "../components/FacilitiesFilter"
import PriceFilter from "../components/PriceFilter"

const Search = () => {
    const search = useSelector(selectAll)
    const [page, setPage] = useState(1)
    const [hotelData, setHotelData] = useState([])
    const [selectedStars, setSelectedStars] = useState([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState([])
    const [selectedFacilities, setSelectedFacilities] = useState([])
    const [selectedPrice, setSelectedPrice] = useState()
    const [sortOption, setSortOption] = useState("")

    const getSearchHotels = async () => {
        try {
            const queryParams = new URLSearchParams()

            queryParams.append("destination", search.destination || "")
            queryParams.append("checkIn", search.checkIn || "")
            queryParams.append("checkOut", search.checkOut || "")
            queryParams.append("adultCount", search.adultCount || 1)
            queryParams.append("childCount", search.childCount || 0)
            queryParams.append("page", page || 1)

            queryParams.append("maxPrice", selectedPrice || "")
            queryParams.append("sortOption", sortOption || "")

            selectedFacilities?.forEach((facility) =>
                queryParams.append("facilities", facility)
            )

            selectedHotelTypes?.forEach((type) =>
                queryParams.append("types", type)
            )
            selectedStars?.forEach((star) => queryParams.append("stars", star))

            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/hotels?${queryParams}`
            )

            if (res?.data?.success) {
                setHotelData(res?.data?.payload)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleStarsChange = (e) => {
        const starRating = e.target.value

        setSelectedStars((prevStars) =>
            e.target.checked
                ? [...prevStars, starRating]
                : prevStars.filter((star) => star !== starRating)
        )
    }

    const handleHotelTypeChange = (e) => {
        const hotelType = e.target.value

        setSelectedHotelTypes((prevHotelTypes) =>
            e.target.checked
                ? [...prevHotelTypes, hotelType]
                : prevHotelTypes.filter((hotel) => hotel !== hotelType)
        )
    }

    const handleFacilityChange = (e) => {
        const facility = e.target.value

        setSelectedFacilities((prevFacilities) =>
            e.target.checked
                ? [...prevFacilities, facility]
                : prevFacilities.filter(
                      (prevFacility) => prevFacility !== facility
                  )
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getSearchHotels()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        search,
        selectedStars,
        selectedHotelTypes,
        selectedFacilities,
        selectedPrice,
        sortOption,
        page,
    ])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
                <div className='space-y-5'>
                    <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
                        Filter by:
                    </h3>
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                    />
                    <HotelTypesFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleHotelTypeChange}
                    />
                    <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilityChange}
                    />
                    <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value) => setSelectedPrice(value)}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>
                        {hotelData?.pagination?.totalHotels} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className='p-2 border rounded-md'
                    >
                        <option value=''>Sort By</option>
                        <option value='starRating'>Star Rating</option>
                        <option value='pricePerNightAsc'>
                            Price Per Night (low to high)
                        </option>
                        <option value='pricePerNightDesc'>
                            Price Per Night (high to low)
                        </option>
                    </select>
                </div>
                {hotelData?.hotels?.map((hotel, idx) => (
                    <SearchHotelsCard key={idx} hotel={hotel} />
                ))}

                <div>
                    <Pagination
                        currentPage={hotelData?.pagination?.currentPage || 1}
                        totalPages={hotelData?.pagination?.totalPages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search
