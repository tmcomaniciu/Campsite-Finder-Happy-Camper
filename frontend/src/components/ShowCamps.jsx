import { useState, useEffect } from 'react';
import '../styles/showCamps.css';
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

function Camps() {

    const [data, setData] = useState([])
    let [state, setState] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:8000/camps`

            console.log('url', url)
            const response = await fetch(url)
            const data = await response.json()
            // console.log(data)
            if (data.length) {
                setData(data)
            }
        }
        fetchData()
    }, [])
    const handleChange = (e) => {
        setState(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('state from input', state);
        const fetchData = async () => {
            const url = `http://localhost:8000/camps?state=${state}`

            console.log('url', url)
            const response = await fetch(url)
            const data = await response.json()
            // console.log(data)
            if (data.length) {
                setData(data)
            }
        }
        fetchData()
    }

    const displayCamps = data.map(camp => {
        return (<li key={camp._id} className="group">

            <a key={camp._id} href={camp.name} className="group"><Link to={`/camp/${camp._id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                        src={camp.imageURL}
                        alt={camp.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{camp.name}</h3>
                <h3 className="mt-4 text-sm text-gray-700">{camp.city}, {camp.state}</h3>

            </Link></a>
        </li>)
    })

    return (
        <div className='font-sans text-2xl'>
            <div className='flex flex-row'>
                <div>List of Camp sites</div>
                <div className='grow h-14'></div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className='border-solid border-2 border-green-600'
                            type="text"
                            name='state'
                            onChange={handleChange}
                        />
                        <button
                            className='bg-green-900 items-center text-white px-3 font-bold hover:bg-slate-200 hover:text-green-900 rounded-full'
                            type="submit">
                            Search by State
                        </button>
                    </form>
                </div>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {displayCamps}
            </ul>
        </div>
    )
}

export default Camps