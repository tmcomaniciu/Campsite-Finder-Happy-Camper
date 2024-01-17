import { useState, useEffect } from 'react';
import '../styles/showCamps.css';
import { Link } from 'react-router-dom'
import SearchCamp from './SearchCamp';

function Camps() {

    const [data, setData] = useState([])
    const [filteredCamps, setFilteredCamps] = useState(data)
    const [searchString, setSearchString] = useState('')
    // initial loading of page
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:8000/camps`

            // console.log('url', url)
            const response = await fetch(url)
            const data = await response.json()
            // console.log(data)
            if (data.length) {
                setData(data)
            }
        }
        fetchData()
    }, [])
    // reloads page when search string changes
    useEffect(() => {
        const newFilteredCamp = data.filter((camp) => {
            const location = camp.city + camp.state + camp.name
            if (location.toLowerCase().includes(searchString)) {
                return camp
            }
        })

        setFilteredCamps(newFilteredCamp)
    }, [data, searchString])

    const handleChange = (e) => {
        return setSearchString(e.target.value.toLowerCase())
    }

    const displayCamps = filteredCamps.map(camp => {
        // console.log(camp.reviews)
        return (<li key={camp._id} className="group">

            <Link to={`/camp/${camp._id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                        src={camp.imageURL}
                        alt={camp.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{camp.name}</h3>
                <h3 className="mt-4 text-sm text-gray-700">{camp.city}, {camp.state}</h3>

            </Link>
        </li>)
    })

    return (
        <div className='font-sans text-2xl'>
            <div className='flex flex-row'>
                <div className='text-2xl font-mono'>List of Camp sites</div>
                <div className='grow h-14'></div>
                <div>
                    <SearchCamp onChangeHandler={handleChange} />
                </div>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {displayCamps}
            </ul>
        </div>
    )
}

export default Camps