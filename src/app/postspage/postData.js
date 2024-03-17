"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "next/link";
import { format } from 'date-fns';


export default function PostPageData({
    query, page
}) {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
             const response = await axios.get('http://localhost:3001/blogs', {
                params: { query, page }
            });
            console.log(response, 'reponse')
            setData(prevData => ({...prevData.data}, response.data)); // Extracting data from the response and setting it to state
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(); 
        console.log(page, 'running')
    }, [query, page]); // Add query and currentPage as dependencies to useEffect

    console.log(data, 'jazdhami')

    const { blogs } = data;

    return (
        <div>
    <div className="max-w-screen-2xl mx-auto flex flex-wrap"></div>
      {blogs?.map(post => (
          <div key={post?._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"> 
            <article className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105">
                <div className="p-6 h-60 w-80 bg-white flex flex-col justify-space-between justify-between overflow-hidden">
                  <h2 className="text-xl font-bold text-yellow-400">{post?.title}</h2>
                  <h4 className="mb-2">{format(new Date(post?.createdAt), 'MMMM dd, yyyy')}</h4>
                  <p className="text-gray-600 flex-1" dangerouslySetInnerHTML={{ __html : post?.content.substring(0, 100) + '...'}} />
                  <h4 className="">{post?.author}<span className="m-1 text-orange-400">in {post?.tags}</span></h4>
                </div>
             </article>
          </div>
        ))}
    </div>
    );
}
