import React, { useEffect, useState } from 'react'
import  axios  from 'axios';

const SortedPost = () => {
    const [postViews, setPostViews] = useState([]);

    useEffect(() => {
        const fetchBlogPosts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/blogs/');
            const blogPosts = response.data;
            console.log(blogPosts);
  
            setPostViews(blogPosts);
          } catch (error) {
            console.error('Error fetching blogs posts:', error)
          }
        };
        fetchBlogPosts();
      }, []);

      const allSortedPosts = postViews.slice().sort((a,b) => b.views - a.views);
      const sortedPosts = allSortedPosts.splice(0,4);
      console.log(sortedPosts, 'sortedposts')

  return (
    <div>
      
    </div>
  )
}

export default SortedPost
