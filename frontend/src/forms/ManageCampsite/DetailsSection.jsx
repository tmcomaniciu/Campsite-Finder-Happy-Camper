import { useFormContext } from "react-hook-form"

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Campsite</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", { required: "This field is required" })}
                />
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>

            <div className="flex gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
                City
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("city", { required: "This field is required" })}
                />
                {errors.city && (
                    <span className="text-red-500">{errors.city.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                State
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("state", { required: "This field is required" })}
                />
                {errors.state && (
                    <span className="text-red-500">{errors.state.message}</span>
                )}
            </label>
            </div>
                <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea
                rows={10}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description", { required: "This field is required" })}
                />
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[30%]">
                Price per Night
                <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerNight", { required: "This field is required" })}
                />
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Star Rating
                <select
                    {...register("starRating", {
                    required: "This field is required",
                })}
                    className="border rounded w-full p-2 text-gray-700 font-normal"
                >
                <option value="" className="text-sm font-bold">
                    Select a Rating
                </option>
                    {[1, 2, 3, 4, 5].map((num) => (
                    <option 
                    key={num} 
                    value={num}>{num}
                    </option> // Added key prop here
                ))}
                    </select>
                    {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                )}
         </label>
        </div>
    )
}

export default DetailsSection;