import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import TypeSection from "./TypeSection"
import FacilitiesSection from "./FacilitiesSection"
import GuestsSection from "./GuestsSection"
import ImagesSection from "./ImagesSection"

const HotelForm = () => {
    const formMethods = useForm()
    return (
        <FormProvider {...formMethods}>
            <form className='flex flex-col gap-10'>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
            </form>
        </FormProvider>
    )
}

export default HotelForm
