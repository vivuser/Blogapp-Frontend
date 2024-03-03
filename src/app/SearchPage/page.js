"use client"
import React, { useEffect, useState } from 'react'
import SearchFeature from '../components/SearchFunctionality/SearchFeature'

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const delay = setTimeout(() => {

            if (searchQuery.trim() !== ''){
                performSearch();
            }
        }, 300)
        return () => clearTimeout(delay);
    }, [searchQuery]);

    const performSearch = async() => {
        try {
            const response = await axios.get(`http://localhost:3001/blogs/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchResults(response.data)
        } catch (error) {
            console.error('Error fetching results', error)
        }
    } ;

const handleInputChange = (value) => {
    setSearchQuery(value);
};



  return (
    <div>
      This is your blog search page
      <SearchFeature onChange ={handleInputChange}/>
    </div>
  )
}

export default SearchPage
