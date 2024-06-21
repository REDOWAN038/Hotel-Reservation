import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DatePicker from "react-datepicker"
import { MdTravelExplore } from "react-icons/md"
import { selectAll } from "../features/search/selector"
import { setAll } from "../features/search/searchSlice"

import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
    const search = useSelector(selectAll)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [destination, setDestination] = useState(search.destination)
    const [checkIn, setCheckIn] = useState(search.checkIn)
    const [checkOut, setCheckOut] = useState(search.checkOut)
    const [adultCount, setAdultCount] = useState(search.adultCount)
    const [childCount, setChildCount] = useState(search.childCount)

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(
            setAll({ destination, checkIn, checkOut, adultCount, childCount })
        )
        navigate("/search")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='-mt-8 p-1 bg-orange-400 rounded-md shadow-md grid grid-cols-2 lg:grid-cols-5 items-center gap-2'
        >
            <div className='flex flex-row items-center flex-1 bg-white p-2'>
                <MdTravelExplore size={25} className='mr-2' />
                <input
                    placeholder='Where are you going?'
                    className='text-md w-full focus:outline-none'
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <div className='flex bg-white px-2 py-1 gap-2'>
                <label className='items-center flex'>
                    Adults:
                    <input
                        className='w-full p-1 focus:outline-none font-bold'
                        type='number'
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(event) => setAdultCount(event.target.value)}
                    />
                </label>
                <label className='items-center flex'>
                    Children:
                    <input
                        className='w-full p-1 focus:outline-none font-bold'
                        type='number'
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(event) => setChildCount(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <DatePicker
                    selected={checkIn}
                    onChange={(date) =>
                        setCheckIn(new Date(date).toISOString())
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
                    selected={checkOut}
                    onChange={(date) =>
                        setCheckOut(new Date(date).toISOString())
                    }
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText='Check-out Date'
                    className='min-w-full bg-white p-2 focus:outline-none'
                    wrapperClassName='min-w-full'
                />
            </div>
            <div>
                <button className='w-full bg-[#003580] text-white p-2 font-bold text-xl hover:bg-blue-800'>
                    Search
                </button>
            </div>
        </form>
    )
}

export default SearchBar
