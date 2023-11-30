'use client'
import { TextField } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [postContent, setPostContent] = useState('');
  const [title, setTitle] = useState('');


  const handleSubmit = async (  ) => {
     try {

      const response = await fetch('http://localhost:3001/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title, content: postContent,
          
        })
      })

      if (response.ok) {
        console.log('Post created successfully');

        setTitle('')
        setPostContent('')
      } else {
        console.error('Failed to create the post');
      }
    } catch (error) { 
      console.error('Error submitting post:', error)
    }
}
  

  return (
        <div className='p-4'>
         <h1 className='font-bold text-2xl'>Home</h1> 
          <div className='font-bold m-4'>

          <div className='p-2'>
          Create a post
          </div>

          <div>
          <TextField 
          id="outlined-basic" 
          label="Title" 
          variant="outlined"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          />
          </div>

          <div className='pt-4'>
          <TextField
          id="outlined-textarea"
          label="Create a post"
          placeholder="Create a post"
          rows={4}
          multiline
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        </div>
          </div>

          <button className='bg-gray-200 m-4 p-2 rounded-md hover:bg-gray-300' onClick={handleSubmit}>Create</button>
        </div>
  )
}
