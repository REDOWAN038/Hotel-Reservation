import { useState } from "react"
import HotelForm from "../forms/HotelForm/HotelForm"
import { showToast } from "../utils/toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddHotel = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSave = async (formData) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-hotels`,
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
    return (
        <>
            <HotelForm
                onSave={handleSave}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                method='Add'
            />
        </>
    )
}

export default AddHotel
