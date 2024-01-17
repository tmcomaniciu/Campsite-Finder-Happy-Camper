import ManageCampsiteForm from "../forms/ManageCampsite/ManageCampsiteForm.jsx";
import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext.jsx";
import * as apiClient from "../api-client";

// Define the AddCampsite component
const AddCampsite = () => {
    // Using the useAppContext hook to access the showToast function from AppContext
    const { showToast } = useAppContext();
    
    // Using the useMutation hook from react-query to handle campsite addition
    // This hook is used for performing mutations (POST, PUT, DELETE requests)
    const { mutate, isLoading } = useMutation(apiClient.addMyCampsite, {
        // onSuccess callback is triggered if the mutation is successful
        onSuccess: () => {
            // Display a success toast message when the campsite is successfully added
            showToast({ message: "Campsite Saved", type: "SUCCESS"});
        },
        // onError callback is triggered if the mutation encounters an error
        onError: (error) => {
            // Log the error to the console and display an error toast message
            console.error("Error Adding Campsite:", error);
            showToast({ message: "Error Saving Campsite", type: "ERROR"});
        }
    });

    // Define handleSave function that takes campsite form data as argument
    const handleSave = (campsiteFormData) => {
        // Calls the mutate function with the campsite form data
        // This initiates the mutation process
        mutate(campsiteFormData);
    };    
    
    // Render the ManageCampsiteForm component
    // Pass handleSave to the onSave prop and isLoading to the isLoading prop
    // This allows the form to be aware of the saving state and to handle form submission
    return (
        <ManageCampsiteForm onSave={handleSave} isLoading={isLoading}/>
    );
};

// Export the AddCampsite component for use in other parts of the app
export default AddCampsite;
