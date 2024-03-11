"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const InfiniteScrollPagination = ({ apiUrl }) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState([])

    const fetchMoreData = async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}?page=${page}`);
            const newData = response.data;

            setData((prevData) => [...prevData, ...newData]);
            setPage((prevPage) => prevPage + 1);
            setHasMore(newData.length > 0);
        } catch (error) {
            console.error('Error fetching more data', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight && 
                !loading && 
                hasMore
            ) {
                fetchMoreData();
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [loading, hasMore]);


    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>

                </div>
            ))}

            {loading && <p>Loading...</p>}
        </div>
    )
}

export default InfiniteScrollPagination;