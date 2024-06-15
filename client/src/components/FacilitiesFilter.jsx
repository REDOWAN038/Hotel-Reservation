import { useDispatch, useSelector } from "react-redux"
import { hotelFacilities } from "../config/hotelOptionsConfig"
import { selectFacilities } from "../features/filter/selector"
import { setFacilities } from "../features/filter/filterSlice"

const FacilitiesFilter = () => {
    const selectedFacilities = useSelector(selectFacilities)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const facility = e.target.value
        const updatedFacilities = e.target.checked
            ? [...selectedFacilities, facility]
            : selectedFacilities.filter(
                  (prevFacility) => prevFacility !== facility
              )
        dispatch(setFacilities(updatedFacilities))
    }

    return (
        <div className='border-b border-slate-300 pb-5'>
            <h4 className='text-md font-semibold mb-2'>Facilities</h4>
            {hotelFacilities.map((facility, idx) => (
                <label key={idx} className='flex items-center space-x-2'>
                    <input
                        type='checkbox'
                        className='rounded'
                        value={facility}
                        checked={selectedFacilities.includes(facility)}
                        onChange={handleChange}
                    />
                    <span>{facility}</span>
                </label>
            ))}
        </div>
    )
}

export default FacilitiesFilter
