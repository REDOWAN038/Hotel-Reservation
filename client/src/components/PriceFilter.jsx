const PriceFilter = ({ selectedPrice, onChange }) => {
    return (
        <div>
            <h4 className='text-md font-semibold mb-2'> Max Price</h4>
            <select
                className='p-2 border rounded-md w-full'
                value={selectedPrice}
                onChange={(event) =>
                    onChange(
                        event.target.value
                            ? parseInt(event.target.value)
                            : undefined
                    )
                }
            >
                <option value=''>Select Max Price</option>
                {[500, 1000, 1500, 2000, 2500, 5000, 8000, 10000].map(
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
