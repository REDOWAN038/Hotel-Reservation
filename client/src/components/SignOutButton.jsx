import axios from "axios"
import { useDispatch } from "react-redux"

import { showToast } from "../utils/toast"
import { logout } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"

const SignOutButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`,
                {},
                { withCredentials: true }
            )

            if (response?.data?.success) {
                dispatch(logout())
                showToast(response?.data?.message, "success")
                navigate("/signin")
            }
        } catch (error) {
            showToast("something went wrong...", "error")
        }
    }

    return (
        <button
            onClick={handleLogout}
            className='text-blue-600 rounded-sm px-3 font-bold bg-white hover:bg-gray-100 '
        >
            Sign Out
        </button>
    )
}

export default SignOutButton
