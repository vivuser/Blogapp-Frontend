import Search from "../components/SearchFunctionality/SearchFeature";
import Pagination from "./Pagination";
import PostPageData from "./postData";

export default async function Page({ searchParams }) {
    const query = searchParams?.query || '';
    const page = searchParams?.page || 1;

    console.log(searchParams, 'search params..')
    console.log(query, 'query logging ....')
    console.log(page, 'current Page logging ....')

    return (
        <div className="mb-20">
            <Search />
            <PostPageData query={query} page={page}/>
            <Pagination totalPages={4} />
        </div>
    )
}