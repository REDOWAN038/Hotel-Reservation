import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { useSelector } from "react-redux"
import { selectAll } from "../features/search/selector"
import axios from "axios"
import { showToast } from "../utils/toast"
import { selectStripePromise, selectUser } from "../features/auth/selector"
import BookingForm from "../forms/BookingForm/BookingForm"
import BookingDetailsSummary from "../components/BookingDetailsSummary"

const Booking = () => {
    const search = useSelector(selectAll)
    const user = useSelector(selectUser)
    const stripePromise = useSelector(selectStripePromise)
    const { hotelId } = useParams()
    const [hotelData, setHotelData] = useState([])
    const [numberOfNights, setNumberOfNights] = useState(0)
    const [paymentIntentData, setPaymentIntentData] = useState(null)

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

    const getPaymentIntent = async () => {
        try {
            const res = await axios.post(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/hotels/booking/payment-intent/${hotelId}`,
                {
                    numberOfNights,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setPaymentIntentData(res?.data?.payload)
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
        const fetchData = async () => {
            try {
                await getPaymentIntent()
            } catch (error) {
                console.log(error)
            }
        }

        if (numberOfNights > 0) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberOfNights])

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
        <div className='grid md:grid-cols-[1fr_2fr] gap-2'>
            <BookingDetailsSummary
                checkIn={search.checkIn.split("T")[0]}
                checkOut={search.checkOut.split("T")[0]}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotelData}
            />

            {user && paymentIntentData && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: paymentIntentData.clientSecret,
                    }}
                >
                    <BookingForm
                        user={user}
                        paymentIntent={paymentIntentData}
                    />
                </Elements>
            )}
        </div>
    )
}

export default Booking
