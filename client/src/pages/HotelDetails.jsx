import { useParams } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"
import axios from "axios"
import { showToast } from "../utils/toast"
import { useEffect, useState } from "react"
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm"

const HotelDetails = () => {
    const { id } = useParams()
    const [hotelData, setHotelData] = useState([])

    const getHotelDetails = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/hotels/${id}`
            )

            if (res?.data?.success) {
                setHotelData(res?.data?.payload?.hotel)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getHotelDetails()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!hotelData) {
        return <></>
    }

    return (
        <div className='space-y-6'>
            <div>
                <span className='flex'>
                    {Array.from({ length: hotelData?.starRating }).map(
                        (idx) => (
                            <AiFillStar key={idx} className='fill-yellow-400' />
                        )
                    )}
                </span>
                <h1 className='text-3xl font-bold'>{hotelData?.name}</h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {hotelData?.imageUrls?.map((image, idx) => (
                    <div key={idx} className='h-[300px]'>
                        <img
                            src={image}
                            alt={hotelData.name}
                            className='rounded-md w-full h-full object-cover object-center'
                        />
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {hotelData?.facilities?.map((facility, idx) => (
                    <div
                        key={idx}
                        className='border border-slate-300 rounded-sm p-3'
                    >
                        {facility}
                    </div>
                ))}
            </div>

            <div className='whitespace-pre-line'>{hotelData?.description}</div>

            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3'>
                {/* <div className='whitespace-pre-line'>
                    {hotelData?.description}
                </div> */}
                <div>
                    <h1 className='text-lg font-bold mb-3'>Available Rooms</h1>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='px-4 py-2'>Type</th>
                                <th className='px-4 py-2'>
                                    Price per Night($)
                                </th>
                                <th className='px-4 py-2'>Adult Count</th>
                                <th className='px-4 py-2'>Child Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelData?.rooms?.map((room, idx) => (
                                <tr key={idx} className='border-t'>
                                    <td className='px-4 py-2'>{room.title}</td>
                                    <td className='px-4 py-2'>
                                        {room.pricePerNight}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {room.adultCount}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {room.childCount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='h-fit'>
                    <GuestInfoForm
                        hotelId={hotelData?._id}
                        rooms={hotelData?.rooms}
                    />
                </div>
            </div>
        </div>
    )
}

export default HotelDetails
