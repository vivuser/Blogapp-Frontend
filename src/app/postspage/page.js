import axios from "axios";
import Search from "../components/SearchFunctionality/SearchFeature";
import Pagination from "./Pagination";
import PostPageData from "./postData";

const fetchData = async (searchParams) => {
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;
    try {
         const response = await axios.get('http://localhost:3001/blogs', {
            params: { query, page }
        });
        return response.data.data
        console.log(response, 'response')
        // if (query.length > 1){
        //     console.log(query.length, 'length')
        // setData(response.data.data.values)
        // } else {
        // setData(prevData => [...prevData, ...response.data.data.values]);
        // }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export default async function Page({ searchParams }) {
const getData = await fetchData(searchParams);
const query = searchParams?.query || '';
const page = searchParams?.page || 1;

console.log(getData, 'getData....')

    return (
        <div className="mb-20">
            <Search />
            <PostPageData query={query} page={page} data={getData?.values || []}/>
            <Pagination totalPages={getData.total/10}  />
        </div>
    )
}