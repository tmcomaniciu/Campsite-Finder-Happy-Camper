import { useFormContext } from "react-hook-form";
import { campsiteTypes } from "../../config/campsite-options-config.js";

// Define the TypeSection component
const TypeSection = () => {
    // Destructure necessary methods and properties from useFormContext
    const {
        register, // Function to register input
        watch, // Function to watch specific form fields for changes
        formState: { errors }, // Object containing form errors
    } = useFormContext();

    // Watch the 'type' field for changes and store its value
    const typeWatch = watch("type");

    // Render the component
    return (
        <div>
            {/* Section title */}
            <h2 className="text-2xl font-bold mb-3">
                Type
            </h2>
            {/* Grid layout for radio button options */}
            <div className="grid grid-cols-5 gap-2">
                {/* Iterate over campsiteTypes to render each type as a radio button */}
                {campsiteTypes.map((type) => (
                    <label
                        key={type} // Unique key for each item in a list
                        className={
                            // Conditional styling: highlight selected type
                            typeWatch === type
                            ? "cursor-pointer bg-green-300 text-sm rounded-full px-4 py-2 font-semibold"
                            : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
                        }
                    >
                        {/* Radio input for selecting type */}
                        <input
                            type="radio"
                            value={type}
                            {...register("type", {
                                required: "This field is required",
                            })}
                            className="hidden" // Hide the default radio button
                        />
                        {/* Display the type name */}
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {/* Display error message if there's an error with the 'type' field */}
            {errors.type && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.type.message}
                </span>
            )}
        </div>
    );
}

export default TypeSection;
