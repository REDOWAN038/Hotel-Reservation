import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectAll } from "../features/search/selector"
import axios from "axios"
import { showToast } from "../utils/toast"
import { selectUser } from "../features/auth/selector"
import BookingForm from "../forms/BookingForm/BookingForm"
import BookingDetailsSummary from "../components/BookingDetailsSummary"

const Booking = () => {
    const search = useSelector(selectAll)
    const user = useSelector(selectUser)
    const { hotelId } = useParams()
    const [hotelData, setHotelData] = useState([])
    const [numberOfNights, setNumberOfNights] = useState(0)

    const getHotelDetails = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/hotels/${hotelId}`
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

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs(
                search.checkOut.split("T")[0].split("-")[2] -
                    search.checkIn.split("T")[0].split("-")[2]
            )

            setNumberOfNights(Math.ceil(nights))
        }
    }, [search.checkIn, search.checkOut])

    if (!hotelData) {
        return <></>
    }

    return (
        <div className='grid md:grid-cols-[1fr_2fr]'>
            <BookingDetailsSummary
                checkIn={search.checkIn.split("T")[0]}
                checkOut={search.checkOut.split("T")[0]}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotelData}
            />

            <BookingForm user={user} />
        </div>
    )
}

export default Booking
