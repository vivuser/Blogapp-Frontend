"use client"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Pagination({totalPages}){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [currentPage, setCurrentPage ]  = useState(Number(searchParams.get('page')) || 1);

    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber?.toString());
        replace (`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        createPageUrl(currentPage)
    }, [currentPage])

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log('triggering...')
            const nextPage = currentPage + 1;
        console.log("Next Page:", nextPage);
            if (nextPage <= totalPages) {
                const nextPageUrl = createPageUrl(nextPage);
                console.log(nextPageUrl, 'this is nextPage url')
                window.history.replaceState(null, null, nextPageUrl);
                setCurrentPage(nextPage);
            }
        }
console.log("Total Pages:", totalPages);
    };

    useEffect(() => {
        window.addEventListener('scroll' , handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [currentPage, totalPages])

    return null
}