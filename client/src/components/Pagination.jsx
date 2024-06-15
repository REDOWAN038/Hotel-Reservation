import { useDispatch } from "react-redux"
import { setPage } from "../features/search/searchSlice"

const Pagination = ({ currentPage, totalPages }) => {
    const dispatch = useDispatch()

    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='flex justify-center'>
            <ul className='flex border border-slate-300'>
                {pageNumbers.map((number, idx) => (
                    <li
                        key={idx}
                        className={`px-2 py-1 ${
                            currentPage === number ? "bg-gray-200" : ""
                        }`}
                    >
                        <button onClick={() => dispatch(setPage(number))}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination
