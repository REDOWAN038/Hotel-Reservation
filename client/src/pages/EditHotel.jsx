import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showToast } from "../utils/toast"
import HotelForm from "../forms/HotelForm/HotelForm"

const EditHotel = () => {
    const { id } = useParams()
    const [hotelData, setHotelData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

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

    const handleSave = async (formData) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-hotels/${id}`,
                formData,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setIsLoading(false)
                showToast(res?.data?.message, "success")
                navigate("/my-hotels")
            }
        } catch (error) {
            setIsLoading(false)
            if (
                error?.response?.status === 401 ||
                error?.response?.status === 404
            ) {
                showToast(error?.response?.data?.message, "error")
                navigate("/signin")
            } else {
                showToast("something went wrong...", "error")
            }
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
            <HotelForm
                onSave={handleSave}
                hotel={hotelData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                method='Update'
            />
        </>
    )
}

export default EditHotel
