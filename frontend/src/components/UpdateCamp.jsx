import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CloseButton from 'react-bootstrap/CloseButton'

function UpdateCamp() {
    const location = useLocation()
    const navigate = useNavigate()
    const { data } = location.state
    const [camp, setCamp] = useState(data)
    const [inputValue, setInputValue] = useState('');
    const [values, setValues] = useState([]);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddValue = () => {
        // Ensure inputValue is not empty before adding to the array
        if (inputValue.trim() !== '') {
            setValues((prevValues) => [...prevValues, inputValue]);
            setInputValue('');
        }
    };
    const initialShowImagesState = []
    for (let i=0; i<camp.imageURLs.length; i++) {
        initialShowImagesState.push(true)
    }
    const [showImages, setShowImages] = useState(initialShowImagesState)

    const handleDeleteChange = () => {

    }
    const handleChange = (e) => {
        setCamp({ ...camp, [e.target.name]: e.target.value })
    }

    const handleCancel = (e) => {
        navigate(`/camp/${data._id}`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            camp.price = Number(camp.price)
            camp.imageURLs = values
            const url = `${process.env.REACT_APP_API_BASE_URL}camps/${data._id}`
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(camp)
            })
            console.log('Updated successfully');
            navigate(`/camp/${data._id}`, { replace: true })
        } catch (error) {
            console.log('Error updating a camp', error);
        }
    }

    const displayImages = camp.imageURLs.map((image, i) => {
        return (
            <>
                {showImages[i] && (
                    <div className="flex mt-2" >
                        <input
                            type="text"
                            name="imageURLs"
                            id="imageURLs"
                            value={image}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleInputChange}
                        />
                        <CloseButton
                            onClick={() => setShowImages[i](!showImages[i])}
                        />
                    </div >)
                }
            </>
        )
    })

    return (
        <form onSubmit={handleSubmit}>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Update campground</h2>
                <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={camp.name}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                    </label>
                    <div className="mt-2">
                        <input
                            id="description"
                            name="description"
                            value={camp.description}
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="city"
                            value={camp.city}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="state"
                            value={camp.state}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="imageURLs" className="block text-sm font-medium leading-6 text-gray-900">
                        Image URLs
                    </label>
                    {/* {displayImages} */}
                    <div className="mt-2">
                        <input
                            type="text"
                            name="imageURLs"
                            id="imageURLs"
                            value={inputValue}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleInputChange}
                        />
                        <label
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleAddValue}
                        >Add Image</label>
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        Price
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="price"
                            value={camp.price}
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Update
                </button>
            </div>
        </form>
    )
}

export default UpdateCamp