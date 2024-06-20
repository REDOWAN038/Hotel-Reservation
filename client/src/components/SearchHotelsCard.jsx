import { Link } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"

const SearchHotelsCard = ({ hotel }) => {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8'>
            <div className='w-full h-[300px]'>
                <img
                    src={hotel.imageUrls[0]}
                    className='w-full h-full object-cover object-center'
                />
            </div>
            <div className='grid grid-rows-[1fr_2fr_1fr]'>
                <div>
                    <div className='flex items-center'>
                        <span className='flex'>
                            {Array.from({ length: hotel.starRating }).map(
                                (idx) => (
                                    <AiFillStar
                                        key={idx}
                                        className='fill-yellow-400'
                                    />
                                )
                            )}
                        </span>
                        <span className='ml-1 text-sm'>{hotel.type}</span>
                    </div>
                    <Link
                        to={`/detail/${hotel._id}`}
                        className='text-2xl font-bold cursor-pointer'
                    >
                        {hotel.name}
                    </Link>
                </div>

                <div>
                    <div className='line-clamp-4'>{hotel.description}</div>
                </div>

                <div className='grid grid-cols-2 items-end whitespace-nowrap'>
                    <div className='flex flex-col items-start gap-1'>
                        <span className='text-base font-bold text-red-600'>
                            {hotel.availableRooms} rooms available
                        </span>
                        <div className='flex gap-1 items-center'>
                            {hotel.facilities
                                .slice(0, 2)
                                .map((facility, idx) => (
                                    <span
                                        key={idx}
                                        className='bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap'
                                    >
                                        {facility}
                                    </span>
                                ))}
                            <span className='text-sm'>
                                {hotel.facilities.length > 2 &&
                                    `+${hotel.facilities.length - 2} more`}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col items-end gap-1'>
                        <span className='text-sm font-bold'>
                            ${hotel.minimumPricePerNight} per night(min)
                        </span>
                        <Link
                            to={`/detail/${hotel._id}`}
                            className='bg-[#003580] text-white h-full p-2 font-bold text-sm md:text-base lg:text-base max-w-fit hover:bg-blue-800'
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchHotelsCard
