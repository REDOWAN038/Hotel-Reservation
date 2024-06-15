import { useDispatch, useSelector } from "react-redux"
import { selectSortOption } from "../features/filter/selector"
import { setSortOption } from "../features/filter/filterSlice"

const SortFilter = () => {
    const sortOption = useSelector(selectSortOption)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(setSortOption(e.target.value))
    }

    return (
        <>
            <select
                value={sortOption}
                onChange={handleChange}
                className='p-2 border rounded-md w-1/2 lg:w-full'
            >
                <option value=''>Sort By</option>
                <option value='starRating'>Star Rating</option>
                <option value='pricePerNightAsc'>
                    Price Per Night (low to high)
                </option>
                <option value='pricePerNightDesc'>
                    Price Per Night (high to low)
                </option>
            </select>
        </>
    )
}

export default SortFilter
