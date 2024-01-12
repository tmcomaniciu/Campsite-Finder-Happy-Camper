function SearchCamp() {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const fetchData = async () => {
            const url = `http://localhost:8000/camps`
            // console.log('url', url);
            const response = await fetch(url)
            const data = await response.json()
        }
        fetchData()
        
        }
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                />
                <button type="submit">Search by State</button>
            </form>
        )
    }

    export default SearchCamp