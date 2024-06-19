import { useEffect, useState } from "react"
import axios from "axios"
import { BsBuilding } from "react-icons/bs"
import { BiMoney, BiHotel } from "react-icons/bi"
// import { MdOutlineBedroomChild } from "react-icons/md"
import { showToast } from "../utils/toast"
import { Link } from "react-router-dom"
import RoomsBookingsFilter from "../components/RoomsBookingsFilter"

const MyRooms = () => {
    const [roomData, setRoomData] = useState([])
    const [selectedRoom, setSelectedRoom] = useState([])
    const [hotelData, setHotelData] = useState([])

    const getMyRooms = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-rooms`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                showToast("Your Rooms", "success")
                setRoomData(res?.data?.payload?.rooms)
                setSelectedRoom(res?.data?.payload?.rooms)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const getMyHotels = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-hotels`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setHotelData(res?.data?.payload?.hotels)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const handleChange = (target) => {
        if (target === "ALL") {
            setSelectedRoom(roomData)
        } else {
            const filteredRoom = roomData?.filter(
                (room) => room?.hotelId.name === target
            )
            setSelectedRoom(filteredRoom)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getMyRooms()
                await getMyHotels()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!roomData) {
        return <span>No Hotels found</span>
    }

    return (
        <div className='space-y-5'>
            <span className='flex justify-between'>
                <h1 className='text-xl md:text-2xl lgLtext-3xl font-bold'>
                    My Rooms
                </h1>
                <div className='flex gap-2'>
                    <RoomsBookingsFilter
                        // selectedRoom={selectedRoom}
                        handleChange={handleChange}
                        hotelData={hotelData}
                    />
                    <Link
                        to='/create-room'
                        className='flex bg-[#003580] text-white text-sm md:text-base lg:text-xl font-bold p-2 hover:bg-blue-800 rounded-sm'
                    >
                        Create Room
                    </Link>
                </div>
            </span>
            <div className='grid grid-cols-1 gap-8'>
                {selectedRoom?.map((room) => (
                    <div
                        key={room._id}
                        data-testid='hotel-card'
                        className='flex flex-col text-sm justify-between border border-slate-300 rounded-lg p-8 gap-5'
                    >
                        <Link
                            to={`/edit-room/${room._id}`}
                            className='text-2xl font-bold'
                        >
                            {room.type}
                        </Link>
                        <div className='whitespace-pre-line line-clamp-4'>
                            {room.description}
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                            {/* <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BsMap className='mr-3' />
                                {hotel.city}, {hotel.country}
                            </div> */}
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BsBuilding className='mr-1' />
                                {room?.hotelId?.name}
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiMoney className='mr-1' />$
                                {room.pricePerNight} per night
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiHotel className='mr-1' />
                                {room.adultCount} adults
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiHotel className='mr-1' />
                                {room.childCount} childs
                            </div>
                        </div>
                        <span className='flex justify-end'>
                            <Link
                                to={`/edit-room/${room._id}`}
                                className='flex bg-[#003580] text-white text-xl font-bold p-2 hover:bg-blue-800'
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyRooms
