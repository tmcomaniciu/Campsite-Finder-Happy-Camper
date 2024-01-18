import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {

    const queryClient = useQueryClient();

    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Signed out", type: "SUCCESS" })
        },
        onError: () => {
            showToast({ message: Error.message, type: "Error" })
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

    return (
    <button onClick ={handleClick}
    className="rounded-lg flex bg-green-900 items-center text-white px-3 font-bold hover:bg-white hover:text-green-900">
        Sign Out
    </button>
    );
};

export default SignOutButton