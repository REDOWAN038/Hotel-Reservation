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
import { selectAllFilters } from "../features/filter/selector"
import SortFilter from "../components/SortFilter"

const Search = () => {
    const search = useSelector(selectAll)
    const filter = useSelector(selectAllFilters)
    const [hotelData, setHotelData] = useState([])

    const getSearchHotels = async () => {
        try {
            const queryParams = new URLSearchParams()

            queryParams.append("destination", search.destination || "")
            queryParams.append("checkIn", search.checkIn || "")
            queryParams.append("checkOut", search.checkOut || "")
            queryParams.append("adultCount", search.adultCount || 1)
            queryParams.append("childCount", search.childCount || 0)
            queryParams.append("page", search.page || 1)

            queryParams.append("maxPrice", filter.maxPrice || "")
            queryParams.append("sortOption", filter.sortOption || "")

            filter.facilities?.forEach((facility) =>
                queryParams.append("facilities", facility)
            )

            filter.hotelTypes?.forEach((type) =>
                queryParams.append("types", type)
            )
            filter.stars?.forEach((star) => queryParams.append("stars", star))

            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/hotels/search?${queryParams}`
            )

            if (res?.data?.success) {
                setHotelData(res?.data?.payload)
            }
        } catch (error) {
            console.log(error)
        }
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
    }, [search, filter])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
                <div className='space-y-5'>
                    <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
                        Filter by:
                    </h3>
                    <StarRatingFilter />
                    <HotelTypesFilter />
                    <FacilitiesFilter />
                    <PriceFilter />
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>
                        {hotelData?.pagination?.totalHotels} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    <SortFilter />
                </div>
                {hotelData?.hotels?.map((hotel, idx) => (
                    <SearchHotelsCard key={idx} hotel={hotel} />
                ))}

                <div>
                    <Pagination
                        currentPage={hotelData?.pagination?.currentPage || 1}
                        totalPages={hotelData?.pagination?.totalPages || 1}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search
