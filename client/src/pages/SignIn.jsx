import { useForm } from "react-hook-form"
import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { showToast } from "../utils/toast"
import { useDispatch } from "react-redux"
import { login } from "../features/auth/authSlice"

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
                {
                    email: data.email,
                    password: data.password,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                dispatch(login(res?.data?.payload))
                showToast(res?.data?.message, "success")
                navigate(location.state?.from?.pathname)
            }
        } catch (error) {
            if (error?.response?.status === 404) {
                showToast(error?.response?.data?.message, "info")
                navigate("/signup")
            } else if (error?.response?.status === 401) {
                showToast(error?.response?.data?.message, "error")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl font-bold'>Sign In</h2>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Email
                <input
                    type='email'
                    className='border rounded w-full py-1 px-2 font-normal'
                    {...register("email", {
                        required: "This field is required",
                    })}
                ></input>
                {errors.email && (
                    <span className='text-red-500'>{errors.email.message}</span>
                )}
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Password
                <input
                    type='password'
                    className='border rounded w-full py-1 px-2 font-normal'
                    {...register("password", {
                        required: "This field is required",
                    })}
                ></input>
                {errors.password && (
                    <span className='text-red-500'>
                        {errors.password.message}
                    </span>
                )}
            </label>
            <div className='flex flex-col md:flex-row gap-5'>
                <span className='text-gray-700 text-sm font-bold flex-1'>
                    Not have an account?
                    <Link
                        to='/signup'
                        className='hover:text-blue-600 underline'
                    >
                        Sign Up
                    </Link>
                </span>
                <span>
                    <button
                        type='submit'
                        className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
                    >
                        Sign In
                    </button>
                </span>
            </div>
        </form>
    )
}

export default SignIn
