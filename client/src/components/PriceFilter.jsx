const PriceFilter = ({ selectedPrice, onChange }) => {
    return (
        <div>
            <h4 className='text-md font-semibold mb-2'> Max Price($)</h4>
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
