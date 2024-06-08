import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { showToast } from "../utils/toast"
import HotelForm from "../forms/HotelForm/HotelForm"

const EditHotel = () => {
    const { id } = useParams()
    const [hotelData, setHotelData] = useState([])

    const getSingleHotel = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-hotels/${id}`,
                {
                    withCredentials: true,
                }
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
                await getSingleHotel()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <HotelForm hotel={hotelData} />
        </>
    )
}

export default EditHotel
