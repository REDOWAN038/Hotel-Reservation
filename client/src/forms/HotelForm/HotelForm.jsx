import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import TypeSection from "./TypeSection"
import FacilitiesSection from "./FacilitiesSection"

const HotelForm = () => {
    const formMethods = useForm()
    return (
        <FormProvider {...formMethods}>
            <form className='flex flex-col gap-10'>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
            </form>
        </FormProvider>
    )
}

export default HotelForm
