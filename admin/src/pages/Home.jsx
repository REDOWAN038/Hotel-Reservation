import axios from "axios"
import { useEffect, useState } from "react"
import { showToast } from "../utils/toast"
import LatestDestinationCard from "../components/LatestDestinationCard"

const Home = () => {
    const [hotelData, setHotelData] = useState([])

    const getAllHotels = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/hotels`
            )

            if (res?.data?.success) {
                setHotelData(res?.data?.payload?.hotels)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllHotels()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const topRowHotels = hotelData?.slice(0, 2) || []
    const bottomRowHotels = hotelData?.slice(2) || []

    return (
        <div className='space-y-3'>
            <h2 className='text-3xl font-bold'>Latest Destinations</h2>
            <p>Most recent desinations added by our hosts</p>
            <div className='grid gap-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    {topRowHotels.map((hotel, idx) => (
                        <LatestDestinationCard key={idx} hotel={hotel} />
                    ))}
                </div>
                <div className='grid md:grid-cols-3 gap-4'>
                    {bottomRowHotels.map((hotel, idx) => (
                        <LatestDestinationCard key={idx} hotel={hotel} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
