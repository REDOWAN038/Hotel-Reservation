import { useSelector } from "react-redux"
import { selectAll } from "../features/search/selector"

const Search = () => {
    const search = useSelector(selectAll)
    console.log("search ", search)

    return <div>Search</div>
}

export default Search
