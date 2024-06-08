import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import TypeSection from "./TypeSection"
import FacilitiesSection from "./FacilitiesSection"
import GuestsSection from "./GuestsSection"
import ImagesSection from "./ImagesSection"
import { useEffect } from "react"

const HotelForm = ({ hotel, onSave, isLoading, setIsLoading }) => {
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
            formData.append("pricePerNight", hotelData.pricePerNight.toString())
            formData.append("starRating", hotelData.starRating.toString())
            formData.append("adultCount", hotelData.adultCount.toString())
            formData.append("childCount", hotelData.childCount.toString())

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
                <GuestsSection />
                <ImagesSection />
                <span className='flex justify-end'>
                    <button
                        disabled={isLoading}
                        type='submit'
                        className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500'
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default HotelForm
