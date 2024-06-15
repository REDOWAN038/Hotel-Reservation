import { useEffect, useState } from "react"
import axios from "axios"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"
import { showToast } from "../utils/toast"
import { Link } from "react-router-dom"

const MyHotels = () => {
    const [hotelData, setHotelData] = useState([])

    const getMyHotels = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-hotels`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                showToast(res?.data?.message, "success")
                setHotelData(res?.data?.payload?.hotels)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getMyHotels()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!hotelData) {
        return <span>No Hotels found</span>
    }

    return (
        <div className='space-y-5'>
            <span className='flex justify-between'>
                <h1 className='text-xl md:text-2xl lgLtext-3xl font-bold'>
                    My Hotels
                </h1>
                <Link
                    to='/add-hotels'
                    className='flex bg-[#003580] text-white text-sm md:text-base lg:text-xl font-bold p-2 hover:bg-blue-800 rounded-sm'
                >
                    Add Hotel
                </Link>
            </span>
            <div className='grid grid-cols-1 gap-8'>
                {hotelData.map((hotel) => (
                    <div
                        key={hotel._id}
                        data-testid='hotel-card'
                        className='flex flex-col text-sm justify-between border border-slate-300 rounded-lg p-8 gap-5'
                    >
                        <Link
                            to={`/edit-hotel/${hotel._id}`}
                            className='text-2xl font-bold'
                        >
                            {hotel.name}
                        </Link>
                        <div className='whitespace-pre-line line-clamp-4'>
                            {hotel.description}
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BsMap className='mr-3' />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BsBuilding className='mr-1' />
                                {hotel.type}
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiMoney className='mr-1' />$
                                {hotel.pricePerNight} per night
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiHotel className='mr-3' />
                                {hotel.adultCount} adults, {hotel.childCount}{" "}
                                children
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiStar className='mr-1' />
                                {hotel.starRating} Star Rating
                            </div>
                        </div>
                        <span className='flex justify-end'>
                            <Link
                                to={`/edit-hotel/${hotel._id}`}
                                className='flex bg-[#003580] text-white text-xl font-bold p-2 hover:bg-blue-800'
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyHotels
