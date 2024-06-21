import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../features/auth/selector"
import { FiMenu } from "react-icons/fi"
import HeaderModal from "../modal/HeaderModal"
import SignOutButton from "./SignOutButton"

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='bg-[#003580] py-6'>
            <div className='container mx-auto flex justify-between'>
                <span className='text-xl lg:text-2xl text-white font-bold tracking-tight'>
                    <Link to='/admin/my-hotels'>CholoGhurteJai</Link>
                </span>
                <span className='hidden lg:flex gap-0 md:space-x-2'>
                    {isLoggedIn ? (
                        <>
                            <Link
                                className='flex items-center text-white px-3 font-bold hover:bg-blue-700 hover:rounded-md'
                                to='/admin/my-bookings'
                            >
                                My Bookings
                            </Link>
                            <Link
                                className='flex items-center text-white px-3 font-bold hover:bg-blue-700 hover:rounded-md'
                                to='/admin/my-rooms'
                            >
                                My Rooms
                            </Link>
                            <Link
                                className='flex items-center text-white px-3 font-bold hover:bg-blue-700 hover:rounded-md'
                                to='/admin/my-hotels'
                            >
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link
                            to='/admin/signin'
                            className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded-sm'
                        >
                            Sign In
                        </Link>
                    )}
                </span>
                <span className='lg:hidden flex items-center'>
                    {isLoggedIn ? (
                        <button onClick={toggleModal} className='text-white'>
                            <FiMenu className='h-6 w-6' />
                        </button>
                    ) : (
                        <Link
                            to='/admin/signin'
                            className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded-sm'
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
            <HeaderModal
                isOpen={isOpen}
                toggleModal={toggleModal}
                isLoggedIn={isLoggedIn}
            />
        </div>
    )
}

export default Header
