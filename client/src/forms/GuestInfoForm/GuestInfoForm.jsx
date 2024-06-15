import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectAll } from "../../features/search/selector"
import { selectIsLoggedIn } from "../../features/auth/selector"
import { setAll } from "../../features/search/searchSlice"

const GuestInfoForm = ({ hotelId, pricePerNight, adultCount, childCount }) => {
    const dispatch = useDispatch()
    const search = useSelector(selectAll)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()
    const location = useLocation()

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    })

    const checkIn = watch("checkIn")
    const checkOut = watch("checkOut")

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    const onSignInClick = (data) => {
        dispatch(
            setAll({
                destination: search.destination,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                adultCount: data.adultCount,
                childCount: data.childCount,
            })
        )
        navigate("/signin", { state: { from: location } })
    }

    const onSubmit = (data) => {
        dispatch(
            setAll({
                destination: search.destination,
                checkIn: data.checkIn,
                checkOut: data.checkOut,
                adultCount: data.adultCount,
                childCount: data.childCount,
            })
        )
        navigate(`/hotel/booking/${hotelId}`)
    }

    return (
        <div className='flex flex-col p-4 bg-blue-200 gap-4'>
            <h3 className='text-md font-bold'>${pricePerNight}</h3>
            <form
                onSubmit={
                    isLoggedIn
                        ? handleSubmit(onSubmit)
                        : handleSubmit(onSignInClick)
                }
            >
                <div className='grid grid-cols-1 gap-4 items-center'>
                    <div>
                        <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) =>
                                setValue("checkIn", date.toISOString())
                            }
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText='Check-in Date'
                            className='min-w-full bg-white p-2 focus:outline-none'
                            wrapperClassName='min-w-full'
                        />
                    </div>
                    <div>
                        <DatePicker
                            required
                            selected={checkOut}
                            onChange={(date) =>
                                setValue("checkOut", date.toISOString())
                            }
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText='Check-in Date'
                            className='min-w-full bg-white p-2 focus:outline-none'
                            wrapperClassName='min-w-full'
                        />
                    </div>
                    <div className='flex bg-white px-2 py-1'>
                        <label className='items-center flex w-1/2'>
                            Adults:
                            <input
                                className='w-full p-1 focus:outline-none font-bold'
                                type='number'
                                min={1}
                                max={adultCount}
                                {...register("adultCount", {
                                    required: "This field is required",
                                    min: {
                                        value: 1,
                                        message:
                                            "There must be at least one adult",
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className='items-center flex w-1/2'>
                            Children:
                            <input
                                className='w-full p-1 focus:outline-none font-bold'
                                type='number'
                                min={0}
                                max={childCount}
                                {...register("childCount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className='text-red-500 font-semibold text-sm'>
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                    {isLoggedIn ? (
                        <button className='bg-[#003580] text-white h-full p-2 font-bold hover:bg-blue-800 text-xl'>
                            Book Now
                        </button>
                    ) : (
                        <button className='bg-[#003580] text-white h-full p-2 font-bold hover:bg-blue-800 text-xl'>
                            Sign in to Book
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default GuestInfoForm
