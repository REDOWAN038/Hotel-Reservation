import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import TypeSection from "./TypeSection"
import FacilitiesSection from "./FacilitiesSection"
import ImagesSection from "./ImagesSection"
import { useEffect } from "react"
import HotelRooms from "../../components/HotelRooms"

const HotelForm = ({
    hotel = null,
    onSave,
    isLoading,
    setIsLoading,
    method,
}) => {
    const formMethods = useForm()
    const { handleSubmit, reset } = formMethods

    const onSubmit = async (hotelData) => {
        try {
            setIsLoading(true)
            const formData = new FormData()

            formData.append("name", hotelData.name)
            formData.append("city", hotelData.city)
            formData.append("country", hotelData.country)
            formData.append("description", hotelData.description)
            formData.append("type", hotelData.type)
            formData.append(
                "minimumPricePerNight",
                hotelData.minimumPricePerNight.toString()
            )
            formData.append("starRating", hotelData.starRating.toString())
            // formData.append("adultCount", hotelData.adultCount.toString())
            // formData.append("childCount", hotelData.childCount.toString())

            hotelData.facilities.forEach((facility, index) => {
                formData.append(`facilities[${index}]`, facility)
            })

            if (hotelData.imageUrls) {
                hotelData.imageUrls.forEach((url, index) => {
                    formData.append(`imageUrls[${index}]`, url)
                })
            }

            Array.from(hotelData.imageFiles).forEach((imageFile) => {
                formData.append(`imageFiles`, imageFile)
            })

            await onSave(formData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        reset(hotel)
    }, [hotel, reset])

    return (
        <FormProvider {...formMethods}>
            <form
                className='flex flex-col gap-10'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                {hotel ? <HotelRooms hotel={hotel} /> : null}
                <ImagesSection />
                <span className='flex justify-end'>
                    <button
                        disabled={isLoading}
                        type='submit'
                        className='bg-[#003580] text-white p-2 font-bold hover:bg-blue-800 text-xl rounded-sm disabled:bg-gray-500'
                    >
                        {isLoading ? "Please Wait..." : `${method}`}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default HotelForm
