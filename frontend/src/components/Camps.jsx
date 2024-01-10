import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

function Camps() {

    const [data, setData] = useState([])

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

    const displayCamps = data.map(camp => {
        return (<li key={camp._id}>
            {camp.name}
        </li>)
    })

    return (
        <div>
            <h2>List of Camp sites</h2>
            <ul>
                {displayCamps}
            </ul>
        </div>
    )
}

export default Camps
