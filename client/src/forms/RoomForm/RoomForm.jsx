import { useEffect, useState } from "react"
import { showToast } from "../../utils/toast"
import axios from "axios"
import { useForm } from "react-hook-form"

const RoomForm = ({ room = null, onSave, isLoading, setIsLoading, method }) => {
    const [name, setName] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const [hotelData, setHotelData] = useState()

    const getHotelData = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-hotels`,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setHotelData(res?.data?.payload?.hotels)
            }
        } catch (error) {
            showToast("something went wrong...", "error")
        }
    }

    const onSubmit = async (roomData) => {
        try {
            setIsLoading(true)
            await onSave(roomData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setName(room?.hotelId?.name)
        setCheckIn(room?.checkIn?.split("T")[0])
        setCheckOut(room?.checkOut?.split("T")[0])
        reset(room)
    }, [room, reset])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getHotelData()
            } catch (error) {
                console.log(error)
            }
        }
        if (method === "Create") {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <form
            className='flex flex-col gap-10'
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className='text-3xl font-bold mb-3'>Create Room</h1>
            {room ? (
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Hotel Name
                    <input
                        type='text'
                        className='border rounded w-full py-1 px-2 font-normal'
                        value={name}
                        disabled
                    ></input>
                </label>
            ) : (
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Select Hotel
                    <select
                        className='border rounded w-full py-1 px-2 font-normal'
                        {...register("hotelId", {
                            required: "This field is required",
                        })}
                    >
                        <option value=''>Select Hotel</option>
                        {hotelData?.map((hotel, idx) => (
                            <option key={idx} value={hotel._id}>
                                {hotel.name}
                            </option>
                        ))}
                    </select>
                    {errors.hotelId && (
                        <span className='text-red-500'>
                            {errors.hotelId.message}
                        </span>
                    )}
                </label>
            )}

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Type
                <input
                    type='text'
                    className='border rounded w-full py-1 px-2 font-normal'
                    {...register("type", {
                        required: "This field is required",
                    })}
                ></input>
                {errors.type && (
                    <span className='text-red-500'>{errors.type.message}</span>
                )}
            </label>

            <label className='text-gray-700 text-sm font-bold flex-1'>
                Description
                <textarea
                    rows={10}
                    className='border rounded w-full py-1 px-2 font-normal'
                    {...register("description", {
                        required: "This field is required",
                    })}
                ></textarea>
                {errors.description && (
                    <span className='text-red-500'>
                        {errors.description.message}
                    </span>
                )}
            </label>

            {room ? (
                <div className='flex space-x-6'>
                    <label className='text-gray-700 text-sm font-bold flex-1'>
                        Check In
                        <input
                            type='date'
                            value={checkIn}
                            className='border rounded w-full py-1 px-2 font-normal'
                        ></input>
                    </label>

                    <label className='text-gray-700 text-sm font-bold flex-1'>
                        Check Out
                        <input
                            type='date'
                            value={checkOut}
                            className='border rounded w-full py-1 px-2 font-normal'
                        ></input>
                    </label>
                </div>
            ) : null}

            <div className='flex space-x-6'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Price Per Night ($)
                    <input
                        type='number'
                        min={1}
                        className='border rounded w-full py-1 px-2 font-normal'
                        {...register("pricePerNight", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.pricePerNight && (
                        <span className='text-red-500'>
                            {errors.pricePerNight.message}
                        </span>
                    )}
                </label>

                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Availability
                    <select
                        className='border rounded w-full py-1 px-2 font-normal'
                        {...register("availability", {
                            required: "This field is required",
                        })}
                    >
                        <option value=''>Select Availability</option>
                        {["true", "false"].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                    {errors.availability && (
                        <span className='text-red-500'>
                            {errors.availability.message}
                        </span>
                    )}
                </label>
            </div>

            <div className='flex space-x-6'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Adult Count
                    <input
                        type='number'
                        min={1}
                        className='border rounded w-full py-1 px-2 font-normal'
                        {...register("adultCount", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.adultCount && (
                        <span className='text-red-500'>
                            {errors.adultCount.message}
                        </span>
                    )}
                </label>

                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Child Count
                    <input
                        type='number'
                        min={1}
                        className='border rounded w-full py-1 px-2 font-normal'
                        {...register("childCount", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.childCount && (
                        <span className='text-red-500'>
                            {errors.childCount.message}
                        </span>
                    )}
                </label>
            </div>

            <span className='flex justify-end'>
                <button
                    disabled={isLoading}
                    type='submit'
                    className='bg-[#003580] text-white p-2 font-bold hover:bg-blue-800 text-xl rounded-sm disabled:bg-gray-500'
                >
                    {isLoading ? "Please Wait..." : `${method}`}
                </button>
            </span>
        </form>
    )
}

export default RoomForm
