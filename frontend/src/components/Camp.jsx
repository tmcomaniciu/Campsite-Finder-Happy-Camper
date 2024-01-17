import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ReviewForm from "./ReviewForm";

function Camp() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const starEmoji = '\u2B50';
    const { id } = useParams()

    let displayReviews = (
        <h4 className='inactive'>
            No reviews yet !
        </h4>
    )

    let rating = (
        <h4 className='inactive'>
            Not yet rated !
        </h4>
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const url = `${REACT_APP_BACKEND_URL}/camps/${id}`
                // console.log('url', url);
                const response = await fetch(url)
                const data = await response.json()
                setIsLoading(false);
                setData(data)
                // console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        }
        fetchData()
    }, [])

    if (!isLoading) {
        if (data.reviews.length) {
            let sumRatings = data.reviews.reduce((total, c) => {
                return total += c.rating
            }, 0)
            let averageRating = Math.round(sumRatings / data.reviews.length)
            let stars = ''
            for (let i = 0; i < averageRating; i++) {
                stars += starEmoji
            }

            rating = (
                <h3>Overall Camper Rating: {stars}</h3>
            )

            displayReviews = data.reviews.map(review => {
                return (
                    <div key={review._id} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <h2>Rating: {review.rating}</h2>

                        </div>

                        <p>{review.body}</p>
                    </div>
                )
            })
        }
    }

    const display = data && (
        <div>
            <h1 className="text-4xl font-mono">{data.name}</h1>
            <div className="flex flex-row">
                <div className="mr-3">
                    <img src={`${data.imageURL}`} />
                </div>
                <div className="text-left">
                    <p>{data.description}</p>
                    <p>Located in {data.city}, {data.state}</p>
                </div>
            </div>
            <div>
                <h2>Pricing</h2>
                <p>${data.price}</p>
                <button className="bg-green-900 items-center text-white px-3 font-bold hover:bg-slate-200 hover:text-green-900 mb-1 rounded-md p-1">Reserve Site</button>
            </div>
            <Link to={`/showcamps`}><button className="bg-green-900 items-center text-white px-3 font-bold hover:bg-slate-200 hover:text-green-800 mr-1 rounded-md p-1">Back</button></Link>
            <Link to={`/updatecamp`} state={{ data: data }}>
                <button className="bg-green-900 items-center text-white px-3 font-bold hover:bg-slate-200 hover:text-green-800 rounded-md p-1">Update</button>
            </Link>
            <div>
                <h1 className="text-2xl">What others are saying </h1>
                <div>
                    {rating}
                    {displayReviews}
                </div>
            </div>
        </div>
    )


    return (
        <div>
            {display}
            <ReviewForm id={id} />
        </div>
    )
}

export default Camp