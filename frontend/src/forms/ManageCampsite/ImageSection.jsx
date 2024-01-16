import { useFormContext } from "react-hook-form";

// Define the ImagesSection component
const ImagesSection = () => {
    // Destructure necessary functions and properties from useFormContext
    const {
        register, // Function to register input fields
        formState: { errors }, // Object containing form validation errors
        watch, // Function to watch specific form fields for changes
        setValue, // Function to set the value of a specific form field
    } = useFormContext();

    // Watching the 'imageUrls' field for changes and storing its value
    const existingImageUrls = watch("imageUrls");

    // Define handleDelete function for removing images
    const handleDelete = (event, imageUrl) => {
        event.preventDefault();
        // Update the 'imageUrls' field by filtering out the deleted image URL
        setValue(
            "imageUrls",
            existingImageUrls.filter((url) => url !== imageUrl)
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {/* Display image thumbnails if there are any existing image URLs */}
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div key={url} className="relative group">
                                {/* Image thumbnail */}
                                <img src={url} alt="campsite" className="min-h-full object-cover" />
                                {/* Delete button for each image */}
                                <button
                                    onClick={(event) => handleDelete(event, url)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {/* Input field for uploading new images */}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        // Custom validation for image file input
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
                            
                            //enforce at least one image
                            if (totalLength === 0) {
                                return "At least one image should be added";
                            }
                            
                            // Validation to limit the total number of images to 6
                            if (totalLength > 6) {
                                return "Total number of images cannot be more than 6";
                            }

                            return true;
                        },
                    })}
                />
            </div>
            {/* Display error message if there's an error with the 'imageFiles' field */}
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    );
};

export default ImagesSection;
