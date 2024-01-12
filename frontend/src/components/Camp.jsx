import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Camp() {
    const [data, setData] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:8000/camps/${id}`
            // console.log('url', url);
            const response = await fetch(url)
            const data = await response.json()
            // console.log(data);
            setData(data)
        }
        fetchData()
    }, [])

    const display = data && (
        <div>
            <h1 className="text-2xl">{data.name}</h1>
            <div className="flex flex-row">
                <div>
                    <img src={`${data.imageURL}`} />
                </div>
                <div>
                    <p>{data.description}</p>
                    <p>Located at {data.city}, {data.state}</p>
                </div>
            </div>


            <div>
                <h2>Pricing</h2>
                <p>${data.price}</p>
                <Button className="bg-green-900 items-center text-white px-3 font-bold hover:bg-slate-200 hover:text-green-900">Reserve Site</Button>
            </div>
                <Button className="bg-green-900 items-center text-white px-3 font-bold hover:bg-slate-200 hover:text-green-900"><Link to={`/showcamps`}>Back</Link></Button>
        </div>

        // <Card style={{ width: '18rem' }}>
        //     <Card.Img variant="top" src={`${data.imageURL}/500px500`} />
        //     <Card.Body>
        //         <Card.Title>{data.name}</Card.Title>
        //         <Card.Text>
        //             {data.description}
        //         </Card.Text>
        //         <Card.Body>{data.city}, {data.state}</Card.Body>
        //     </Card.Body>
        // </Card>

    )

    return (
        <div>
            {display}
        </div>
    )
}

export default Camp