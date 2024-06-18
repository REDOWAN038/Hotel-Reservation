import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showToast } from "../utils/toast"
import RoomForm from "../forms/RoomForm/RoomForm"

const EditRoom = () => {
    const { id } = useParams()
    const [roomData, setRoomData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getSingleRoom = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-rooms/${id}`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setRoomData(res?.data?.payload?.room)
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error")
        }
    }

    const handleSave = async (formData) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/my-rooms/${id}`,
                formData,
                { withCredentials: true }
            )

            if (res?.data?.success) {
                setIsLoading(false)
                showToast(res?.data?.message, "success")
                navigate("/my-rooms")
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
                await getSingleRoom()
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <RoomForm
                onSave={handleSave}
                room={roomData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                method='Update'
            />
        </>
    )
}

export default EditRoom
