import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';

function ReviewForm({ id }) {
    const INIT_STATE = {
        body: '',
        rating: '',
    }

    const [data, setData] = useState(INIT_STATE)
    const navigate = useNavigate()
    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/camps/${id}/reviews`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            navigate(`/showcamps`, { replace: true })
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-mono"> Write a Review</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className='border-solid border-2 border-green-600 mr-1 rounded-md p-1'
                    type="text"
                    required
                    name='body'
                    placeholder='Review'
                    value={data.body}
                    onChange={onChangeHandler}
                />
                <input
                    className='border-solid border-2 border-green-600 mr-1 rounded-md p-1'
                    type="text"
                    required
                    name='rating'
                    placeholder='Stars'
                    value={data.rating}
                    onChange={onChangeHandler}
                />
                <Button><input
                    className='bg-green-900 items-center text-white px-3 font-bold hover:bg-slate-200 hover:text-green-900 rounded-md p-1'
                    type="submit"
                /></Button>
            </form>
        </div>
    )
}

export default ReviewForm