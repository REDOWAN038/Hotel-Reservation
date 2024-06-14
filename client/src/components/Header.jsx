import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../features/auth/selector"
import SignOutButton from "./SignOutButton"

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    return (
        <div className='bg-[#003580] py-6'>
            <div className='container mx-auto flex justify-between'>
                <span className='text-xl md:text-2xl text-white font-bold tracking-tight'>
                    <Link to='/'>CholoGhurteJai</Link>
                </span>
                <span className='flex gap-0 md:space-x-2'>
                    {isLoggedIn ? (
                        <>
                            <Link
                                className='flex items-center text-white px-3 font-bold hover:bg-blue-700 hover:rounded-md'
                                to='/my-bookings'
                            >
                                My Bookings
                            </Link>
                            <Link
                                className='flex items-center text-white px-3 font-bold hover:bg-blue-700 hover:rounded-md'
                                to='/my-hotels'
                            >
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link
                            to='/signin'
                            className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded-md'
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    )
}

export default Header
