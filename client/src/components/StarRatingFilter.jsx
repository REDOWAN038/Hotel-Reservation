import { useDispatch, useSelector } from "react-redux"
import { setStars } from "../features/filter/filterSlice"
import { selectStars } from "../features/filter/selector"

const StarRatingFilter = () => {
    const selectedStars = useSelector(selectStars)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const starRating = e.target.value
        const updatedStars = e.target.checked
            ? [...selectedStars, starRating]
            : selectedStars.filter((prevStar) => prevStar !== starRating)
        dispatch(setStars(updatedStars))
    }

    return (
        <div className='border-b border-slate-300 pb-5'>
            <h4 className='text-md font-semibold mb-2'>Property Rating</h4>
            {["5", "4", "3", "2", "1"].map((star, idx) => (
                <label key={idx} className='flex items-center space-x-2'>
                    <input
                        type='checkbox'
                        className='rounded'
                        value={star}
                        checked={selectedStars.includes(star)}
                        onChange={handleChange}
                    />
                    <span>{star} Stars</span>
                </label>
            ))}
        </div>
    )
}

export default StarRatingFilter
