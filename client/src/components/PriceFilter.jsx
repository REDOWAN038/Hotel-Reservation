import { useDispatch, useSelector } from "react-redux"
import { selectMaxPrice } from "../features/filter/selector"
import { setMaxPrice } from "../features/filter/filterSlice"

const PriceFilter = () => {
    const selectedPrice = useSelector(selectMaxPrice)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(setMaxPrice(parseInt(e.target.value)))
    }

    return (
        <div>
            <h4 className='text-md font-semibold mb-2'> Max Price($)</h4>
            <select
                className='p-2 border rounded-md w-full'
                value={selectedPrice}
                onChange={handleChange}
            >
                <option value=''>Select Max Price</option>
                {[25, 50, 75, 100, 125, 150, 200, 250, 300].map(
                    (price, idx) => (
                        <option key={idx} value={price}>
                            {price}
                        </option>
                    )
                )}
            </select>
        </div>
    )
}

export default PriceFilter
