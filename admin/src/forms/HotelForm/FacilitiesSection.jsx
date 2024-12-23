import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../../config/hotelOptionsConfig"

const FacilitiesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    return (
        <>
            <h2 className='text-2xl font-bold mb-3'>Facilities</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
                {hotelFacilities.map((facility, idx) => (
                    <label
                        key={idx}
                        className='text-sm flex gap-1 text-gray-700'
                    >
                        <input
                            type='checkbox'
                            value={facility}
                            {...register("facilities", {
                                validate: (facilities) => {
                                    if (facilities && facilities.length > 0) {
                                        return true
                                    } else {
                                        return "At least one facility is required"
                                    }
                                },
                            })}
                        />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className='text-red-500 text-sm font-bold'>
                    {errors.facilities.message}
                </span>
            )}
        </>
    )
}

export default FacilitiesSection
