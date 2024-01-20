import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ReviewForm from "./ReviewForm";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

function Camp() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const starEmoji = '\u2B50';
    const { id } = useParams()
    let display = (
        <h1>Loading...</h1>
    )

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
                const url = `${process.env.REACT_APP_API_BASE_URL}camps/${id}`
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
                <h4>Overall Camper Rating: {stars}</h4>
            )

            displayReviews = data.reviews.map(review => {
                let reviewerStars = ''
                for (let i = 0; i < review.rating; i++) {
                    reviewerStars += starEmoji
                }
                return (
                    <div key={review._id} className="flex max-w-xl flex-col items-start justify-between shadow-md p-1">
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{reviewerStars}</p>
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            <span className="absolute inset-0" />
                            {review.body}
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{review.username}</p>
                    </div>

                )
            })
        }
        const displayImages = data.imageURLs.map((image, i) => {
            const auto = window.innerWidth
            return (
                <Carousel.Item key={`image${i}`}>
                    <Image
                        key={`image${i}`}
                        width={auto}
                        height={400}
                        
                        alt='imageCarousel'
                        src={image}
                    />
                </Carousel.Item>
            )
        })

        display = data && (
            <div>
                <h1 className="text-4xl font-mono">{data.name}</h1>
                <div >
                    <Carousel fade>
                        {displayImages}
                    </Carousel>
                </div>
                <div className="flex flex-row">

                    <div className="text-left">
                        <p>{data.description}</p>
                        <p>Located in {data.city}, {data.state}</p>
                    </div>
                </div>
                <div>
                    <h2>Pricing</h2>
                    <p>${data.price}</p>
                    <button className="bg-green-900 items-center text-white px-3 font-bold hover:bg-green-700 hover:text-green-900 mb-1 rounded-md p-1">Reserve Site</button>
                </div>
                <Link to={`/showcamps`}><button className="bg-green-900 items-center text-white px-3 font-bold hover:bg-green-700 hover:text-green-800 mr-1 rounded-md p-1">Back</button></Link>
                <Link to={`/updatecamp`} state={{ data: data }}>
                    <button className="bg-green-900 items-center text-white px-3 font-bold hover:bg-green-700 hover:text-green-800 rounded-md p-1">Update</button>
                </Link>
                <div>
                    <h1 className="text-4xl">What others are saying </h1>
                    <div>
                        {rating}
                        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {displayReviews}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {display}
            <ReviewForm id={id} />
        </div>
    )
}

export default Camp;
