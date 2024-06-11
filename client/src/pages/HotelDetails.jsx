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

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
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

            <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
                {hotelData?.facilities?.map((facility, idx) => (
                    <div
                        key={idx}
                        className='border border-slate-300 rounded-sm p-3'
                    >
                        {facility}
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
                <div className='whitespace-pre-line'>
                    {hotelData?.description}
                </div>
                <div className='h-fit'>
                    <GuestInfoForm
                        hotelId={hotelData?._id}
                        pricePerNight={hotelData?.pricePerNight}
                        adultCount={hotelData?.adultCount}
                        childCount={hotelData?.childCount}
                    />
                </div>
            </div>
        </div>
    )
}

export default HotelDetails
