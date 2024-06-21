import { useEffect, useState } from "react"
import axios from "axios"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiMoney, BiStar } from "react-icons/bi"
import { MdOutlineBedroomChild } from "react-icons/md"
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
                showToast("Your Hotels", "success")
                setHotelData(res?.data?.payload?.hotels)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const handleDeleteHotel = async (id) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this hotel?"
        )

        if (isConfirmed) {
            try {
                const res = await axios.delete(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/my-hotels/${id}`,
                    { withCredentials: true }
                )

                if (res?.data?.success) {
                    showToast(res?.data?.message, "success")
                    window.location.reload()
                }
            } catch (error) {
                if (error?.response?.status === 405) {
                    showToast(error?.response?.data?.message, "error")
                } else {
                    showToast("something went wrong", "error")
                }
            }
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
                    to='/admin/add-hotels'
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
                            to={`/admin/edit-hotel/${hotel._id}`}
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
                                {hotel.minimumPricePerNight} per night (min)
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <MdOutlineBedroomChild className='mr-3' />
                                {hotel.rooms.length} rooms
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiStar className='mr-1' />
                                {hotel.starRating} Star Rating
                            </div>
                        </div>
                        <span className='flex justify-end'>
                            <div className='flex gap-1'>
                                <button
                                    onClick={() => handleDeleteHotel(hotel._id)}
                                    className='flex bg-red-600 text-white text-xl font-bold p-2 hover:bg-red-500 flex-1 rounded-md'
                                >
                                    Delete
                                </button>
                                <Link
                                    to={`/admin/edit-hotel/${hotel._id}`}
                                    className='flex bg-[#003580] text-white text-xl font-bold p-2 hover:bg-blue-800 flex-1 rounded-md'
                                >
                                    Details
                                </Link>
                            </div>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyHotels
