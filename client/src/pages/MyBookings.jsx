import { useEffect, useState } from "react"
import { showToast } from "../utils/toast"
import axios from "axios"
import { Link } from "react-router-dom"

const MyBookings = () => {
    const [bookings, setBookings] = useState([])

    const handleGetBookings = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-bookings`,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setBookings(res?.data?.payload?.bookings)
            }
        } catch (error) {
            showToast("something went wrong", "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleGetBookings()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!bookings) {
        return <></>
    }
    return (
        <div className='space-y-5'>
            <h1 className='text-3xl font-bold'>My Bookings</h1>
            {bookings.map((booking, idx) => (
                <div
                    key={idx}
                    className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'
                >
                    <div className='lg:w-full lg:h-[250px]'>
                        <img
                            src={booking.hotelId.imageUrls[0]}
                            className='w-full h-full object-cover object-center'
                        />
                    </div>
                    <div className='flex flex-col gap-4 overflow-y-auto max-h-[300px]'>
                        <div className='text-2xl font-bold'>
                            <Link
                                to={`/edit-hotel/${booking.hotelId._id}`}
                                className='text-2xl font-bold cursor-pointer'
                            >
                                {booking.hotelId.name}
                            </Link>
                            <div className='text-xs font-normal'>
                                {booking.hotelId.city},{" "}
                                {booking.hotelId.country}
                            </div>
                        </div>
                        <div>
                            <span className='font-bold mr-2'>Booked By:</span>
                            <span>{booking.userId?.firstName}</span>
                            <span> </span>
                            <span>{booking.userId?.lastName}</span>
                        </div>

                        <div>
                            <span className='font-bold mr-2'>Room Type: </span>
                            <span>{booking.roomId.type}</span>
                        </div>
                        <div>
                            <span className='font-bold mr-2'>Dates: </span>
                            <span>
                                {new Date(booking.checkIn).toDateString()} -
                                {new Date(booking.checkOut).toDateString()}
                            </span>
                        </div>
                        <div>
                            <span className='font-bold mr-2'>Guests:</span>
                            <span>
                                {booking.adultCount} adults,{" "}
                                {booking.childCount} children
                            </span>
                        </div>
                        <div>
                            <span className='font-bold mr-2'>Total Costs:</span>
                            <span>${booking.totalCost}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyBookings
