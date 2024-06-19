import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { selectAll } from "../../features/search/selector"
import { showToast } from "../../utils/toast"
import { useState } from "react"
import axios from "axios"

const BookingForm = ({ user, paymentIntent, roomData }) => {
    const stripe = useStripe()
    const elements = useElements()
    const search = useSelector(selectAll)
    const { hotelId, roomId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { handleSubmit, register } = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            adultCount: roomData?.adultCount,
            childCount: roomData?.childCount,
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            hotelId: hotelId,
            roomId: roomId,
            totalCost: paymentIntent?.totalCost,
            paymentIntentId: paymentIntent?.paymentIntentId,
        },
    })

    const onSubmit = async (formData) => {
        if (!stripe || !elements) {
            return
        }
        try {
            setIsLoading(true)
            const result = await stripe.confirmCardPayment(
                paymentIntent.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            )

            if (result?.paymentIntent?.status === "succeeded") {
                const res = await axios.post(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/my-rooms/booking/${hotelId}/${roomId}`,
                    formData,
                    { withCredentials: true }
                )

                if (res?.data?.success) {
                    setIsLoading(false)
                    showToast(res?.data?.message, "success")
                    navigate("/my-bookings")
                }
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            showToast("something went wrong...", "error")
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5'
        >
            <span className='text-3xl font-bold'>Confirm Your Details</span>
            <div className='grid grid-cols-2 gap-6'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    First Name
                    <input
                        className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
                        type='text'
                        readOnly
                        disabled
                        {...register("firstName")}
                    />
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Last Name
                    <input
                        className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
                        type='text'
                        readOnly
                        disabled
                        {...register("lastName")}
                    />
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Email
                    <input
                        className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
                        type='text'
                        readOnly
                        disabled
                        {...register("email")}
                    />
                </label>
            </div>

            <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>Your Price Summary</h2>

                <div className='bg-blue-200 p-4 rounded-md'>
                    <div className='font-semibold text-lg'>
                        Total Cost: ${paymentIntent.totalCost.toFixed(2)}
                    </div>
                    <div className='text-xs'>Includes taxes and charges</div>
                </div>
            </div>

            <div className='space-y-2'>
                <h3 className='text-xl font-semibold'> Payment Details</h3>
                <CardElement
                    id='payment-element'
                    className='border rounded-md p-2 text-sm'
                />
            </div>

            <div className='flex justify-end'>
                <button
                    disabled={isLoading}
                    type='submit'
                    className='bg-[#003580] text-white p-2 font-bold hover:bg-blue-800 text-md disabled:bg-gray-500'
                >
                    {isLoading ? "Please Wait..." : "Confirm Booking"}
                </button>
            </div>
        </form>
    )
}

export default BookingForm
