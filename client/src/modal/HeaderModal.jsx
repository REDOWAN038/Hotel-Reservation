import { Transition } from "@headlessui/react"
import { FiX } from "react-icons/fi"
import { Link } from "react-router-dom"
import SignOutButton from "../components/SignOutButton"

const HeaderModal = ({ isOpen, toggleModal }) => {
    return (
        <Transition
            show={isOpen}
            as='div'
            enter='transition ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
        >
            <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
                <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-lg font-bold'>Menu</h2>
                        <button onClick={toggleModal} className='text-gray-700'>
                            <FiX className='h-6 w-6' />
                        </button>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <Link
                            to='/bookings'
                            className='text-gray-800'
                            onClick={toggleModal}
                        >
                            Bookings
                        </Link>
                        <a
                            className='flex items-center text-white px-3 font-bold hover:bg-blue-700 hover:rounded-md'
                            href={`${
                                import.meta.env.VITE_ADMIN_URL
                            }/admin/my-hotels`}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            List Your Hotels
                        </a>
                        <SignOutButton />
                    </div>
                </div>
            </div>
        </Transition>
    )
}

export default HeaderModal
