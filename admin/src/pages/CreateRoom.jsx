import { useState } from "react"
import RoomForm from "../forms/RoomForm/RoomForm"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { showToast } from "../utils/toast"

const CreateRoom = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSave = async (formData) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-rooms`,
                formData,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setIsLoading(false)
                showToast(res?.data?.message, "success")
                navigate("/admin/my-rooms")
            }
        } catch (error) {
            setIsLoading(false)
            if (
                error?.response?.status === 401 ||
                error?.response?.status === 404
            ) {
                showToast(error?.response?.data?.message, "error")
                navigate("/admin/signin")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    return (
        <>
            <RoomForm
                onSave={handleSave}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                method='Create'
            />
        </>
    )
}

export default CreateRoom
