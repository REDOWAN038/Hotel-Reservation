import { useSelector } from "react-redux"
import { selectAll } from "../features/search/selector"
import axios from "axios"
import { useEffect, useState } from "react"
import SearchHotelsCard from "../components/SearchHotelsCard"

const Search = () => {
    const search = useSelector(selectAll)
    const [page, setPage] = useState(1)
    const [hotelData, setHotelData] = useState([])

    const getSearchHotels = async () => {
        try {
            const queryParams = new URLSearchParams()

            queryParams.append("destination", search.destination || "")
            queryParams.append("checkIn", search.checkIn || "")
            queryParams.append("checkOut", search.checkOut || "")
            queryParams.append("adultCount", search.adultCount || "")
            queryParams.append("childCount", search.childCount || "")
            queryParams.append("page", page || 1)

            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/hotels?${queryParams}`
            )

            if (res?.data?.success) {
                console.log("res ", res?.data?.payload)
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
    }, [])

    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
                <div className='space-y-5'>
                    <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
                        Filter by:
                    </h3>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>
                        {hotelData?.pagination?.totalHotels} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                </div>
                {hotelData?.hotels?.map((hotel, idx) => (
                    <SearchHotelsCard key={idx} hotel={hotel} />
                ))}
            </div>
        </div>
    )
}

export default Search
