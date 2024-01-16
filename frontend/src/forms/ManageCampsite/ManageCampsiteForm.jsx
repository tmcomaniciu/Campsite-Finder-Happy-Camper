import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImageSection";

// Define the ManageCampsiteForm component with onSave and isLoading props
const ManageCampsiteForm = ({ onSave, isLoading }) => {
    // Initialize form methods using useForm hook from react-hook-form
    const formMethods = useForm();
    // Destructure handleSubmit method from form methods
    const { handleSubmit } = formMethods;

    // Define onSubmit function that will be called when the form is submitted
    const onSubmit = (formDataJson) => {
        // Create a FormData object to store and send form data
        const formData = new FormData();

        // Append individual form fields to the FormData object
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("state", formDataJson.state);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        // Append facilities array to the FormData object
        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        // Append image URLs if available
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }

        // Append image files to the FormData object
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });

        // Call the onSave function passed as a prop with formData as argument
        onSave(formData);
    };

    // Render the form using FormProvider and various form sections
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button disabled={isLoading} type="submit" className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-xl disabled:bg-gray-500">
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageCampsiteForm;
