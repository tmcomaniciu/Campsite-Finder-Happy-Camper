import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SignIn = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.SignIn, {
        onSuccess: async () => {
            showToast({ message: "Successfully Signed In", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken")
            navigate("/");
        },
        onError: (error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>

            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not Registered? <Link className="underline" to="/register">Create an Account Here</Link>
                </span>
                <button
                    type="submit"
                    className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-xl"
                >
                    Login
                </button>
            </span>

        </form>
    );
};

export default SignIn;