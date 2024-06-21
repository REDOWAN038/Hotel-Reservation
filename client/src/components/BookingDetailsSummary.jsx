const BookingDetailsSummary = ({
    checkIn,
    checkOut,
    // adultCount,
    // childCount,
    numberOfNights,
    hotel,
    room,
}) => {
    return (
        <div className='grid gap-4 rounded-lg border border-slate-300 p-5 h-fit'>
            <h2 className='text-xl font-bold'>Your Booking Details</h2>
            <div className='border-b py-2'>
                Location:
                <div className='font-bold'>{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            </div>
            <div className='flex justify-between'>
                <div>
                    Check-in
                    <div className='font-bold'> {checkIn}</div>
                </div>
                <div>
                    Check-out
                    <div className='font-bold'> {checkOut}</div>
                </div>
            </div>
            <div className='border-t py-2'>
                Room Type:
                <div className='font-bold'>{room?.type} </div>
            </div>
            <div className='border-t border-b py-2'>
                Total length of stay:
                <div className='font-bold'>{numberOfNights} nights</div>
            </div>

            <div>
                Guests{" "}
                <div className='font-bold'>
                    {room?.adultCount} adults & {room?.childCount} children
                </div>
            </div>
        </div>
    )
}

export default BookingDetailsSummary
