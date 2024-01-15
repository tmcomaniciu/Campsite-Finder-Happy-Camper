function SearchCamp({ onChangeHandler }) {

    return (
        <input
            className='border-solid border-2 border-green-600'
            type='search'
            placeholder='Search'
            onChange={onChangeHandler}
        />
    )
}

export default SearchCamp