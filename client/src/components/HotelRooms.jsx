const HotelRooms = ({ hotel }) => {
    return (
        <div>
            <h1 className='text-lg font-bold mb-3'>Hotel Rooms</h1>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='px-4 py-2'>Type</th>
                        <th className='px-4 py-2'>Description</th>
                        <th className='px-4 py-2'>Price per Night($)</th>
                        <th className='px-4 py-2'>Adult Count</th>
                        <th className='px-4 py-2'>Child Count</th>
                    </tr>
                </thead>
                <tbody>
                    {hotel?.rooms?.map((room, idx) => (
                        <tr key={idx} className='border-t'>
                            <td className='px-4 py-2 text-center'>
                                {room.type}
                            </td>
                            <td className='px-4 py-2 text-center'>
                                {room.description}
                            </td>
                            <td className='px-4 py-2 text-center'>
                                {room.pricePerNight}
                            </td>
                            <td className='px-4 py-2 text-center'>
                                {room.adultCount}
                            </td>
                            <td className='px-4 py-2 text-center'>
                                {room.childCount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HotelRooms
