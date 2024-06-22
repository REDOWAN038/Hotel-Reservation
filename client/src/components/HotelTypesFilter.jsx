import { useDispatch, useSelector } from "react-redux"
import { hotelTypes } from "../config/hotelOptionsConfig"
import { selectHotelTypes } from "../features/filter/selector"
import { setHotelTypes } from "../features/filter/filterSlice"

const HotelTypesFilter = () => {
    const selectedHotelTypes = useSelector(selectHotelTypes)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const hotelType = e.target.value
        const updatedHotelTypes = e.target.checked
            ? [...selectedHotelTypes, hotelType]
            : selectedHotelTypes.filter(
                  (prevHotelType) => prevHotelType !== hotelType
              )
        dispatch(setHotelTypes(updatedHotelTypes))
    }

    return (
        <div className='border-b border-slate-300 pb-5'>
            <h4 className='text-sm lg:text-base font-semibold mb-2'>
                Hotel Type
            </h4>
            <div className='grid grid-cols-3 lg:grid-cols-1'>
                {hotelTypes.map((hotelType, idx) => (
                    <label key={idx} className='flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            className='rounded'
                            value={hotelType}
                            checked={selectedHotelTypes.includes(hotelType)}
                            onChange={handleChange}
                        />
                        <span className='text-sm lg:text-base'>
                            {hotelType}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default HotelTypesFilter
