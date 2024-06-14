import { useForm } from "react-hook-form"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { showToast } from "../utils/toast"

const SignUp = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/users/register`,
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                },
                { withCredentials: true }
            )

            if (res?.data?.success) {
                showToast(res?.data?.message, "success")
                navigate("/signin")
            }
        } catch (error) {
            if (error?.response?.status === 409) {
                showToast(error?.response?.data?.message, "info")
                navigate("/signin")
            } else {
                showToast("something went wrong...", "error")
            }
        }
    }

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl font-bold'>Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    First Name
                    <input
                        className='border rounded w-full py-1 px-2 font-normal'
                        {...register("firstName", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.firstName && (
                        <span className='text-red-500'>
                            {errors.firstName.message}
                        </span>
                    )}
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Last Name
                    <input
                        className='border rounded w-full py-1 px-2 font-normal'
                        {...register("lastName", {
                            required: "This field is required",
                        })}
                    ></input>
                    {errors.lastName && (
                        <span className='text-red-500'>
                            {errors.lastName.message}
                        </span>
                    )}
                </label>
            </div>
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
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Confirm Password
                <input
                    type='password'
                    className='border rounded w-full py-1 px-2 font-normal'
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required"
                            } else if (watch("password") !== val) {
                                return "Your passwords do not match"
                            }
                        },
                    })}
                ></input>
                {errors.confirmPassword && (
                    <span className='text-red-500'>
                        {errors.confirmPassword.message}
                    </span>
                )}
            </label>
            <div className='flex flex-col md:flex-row gap-5'>
                <span className='text-gray-700 text-sm font-bold flex-1'>
                    Already have an account?
                    <Link
                        to='/signin'
                        className='hover:text-blue-600 underline'
                    >
                        Sign In
                    </Link>
                </span>
                <span>
                    <button
                        type='submit'
                        className='bg-[#003580] text-white p-2 font-bold hover:bg-blue-800 text-xl'
                    >
                        Create Account
                    </button>
                </span>
            </div>
        </form>
    )
}

export default SignUp
