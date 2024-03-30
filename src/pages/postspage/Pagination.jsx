"use client"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Pagination({totalPages}){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [currentPage, setCurrentPage ]  = useState(Number(searchParams.get('page')) || 1);

    const createPageUrl = async (pageNumber) => {
        return new Promise((resolve, reject) => {
            try {
                const params = new URLSearchParams(searchParams);
                params.set('page', pageNumber?.toString());
                const nextPageUrl = `${pathname}?${params.toString()}`;
                replace(nextPageUrl);
                resolve(nextPageUrl);
            } catch (error) {
                reject(error);
            }
        });
    };
    
    console.log(currentPage, 'changing...')

    useEffect(() => {
        createPageUrl(currentPage)
    }, [currentPage])

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log('triggering...')
            console.log(currentPage, 'currentPage')
            // const nextPage = currentPage + 1;
            console.log(totalPages, 'totalPages')
            if (currentPage + 1 <= totalPages) {
                console.log('trying.....')
                createPageUrl(currentPage + 1).then(nextPageUrl => {
                    console.log(nextPageUrl, 'this is nextPage url');
                    if (nextPageUrl) {
                        console.log('Updating history state and current page...');
                        window.history.replaceState(null, null, nextPageUrl);
                        setCurrentPage(currentPage + 1);
                        console.log(currentPage+1, 'current page to send in api fetch')
                    } else {
                        console.error('Error: nextPageUrl is undefined or null');
                    }
                }).catch(error => {
                    console.error('Error occurred while generating next page URL:', error);
                });
            } else {
                console.log('Already at the last page.');
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