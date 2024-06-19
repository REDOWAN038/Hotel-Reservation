const RoomsBookingsFilter = ({ handleChange, hotelData }) => {
    return (
        <>
            <select
                // value={selectedRoom}
                onChange={(e) => handleChange(e.target.value)}
                className='p-2 border rounded-md'
            >
                <option value='ALL'>ALL</option>
                {hotelData?.map((hotel, idx) => (
                    <option key={idx} value={hotel.name}>
                        {hotel.name}
                    </option>
                ))}
            </select>
        </>
    )
}

export default RoomsBookingsFilter
