'use client'
import { TextField } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'


export default function Home() {

  const [postContent, setPostContent] = useState('');
  const [title, setTitle] = useState('');
  const [showPad, setShowPad] = useState(false);

  const userId = JSON.parse(localStorage.getItem('userData'))?.userId

  const handleSubmit = async (  ) => {
     try {

      const response = await fetch('http://localhost:3001/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title, 
          content: postContent,
          userId: userId
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

const handleAddPost = () =>{
  setShowPad((prev) => !prev);
}
  

  return (
        <div className=''>
          <div className='h-80 bg-yellow-300 flex items-center justify-center'>
            <h1 className='bg-white p-4 font-bold text-lg rounded-3xl hover:rounded-lg'>Tech blogs to read and grow</h1>
          </div>

          <div className='font-bold m-4'>

          <div className='my-6'>
          <h1 className='text-xl'>Most read this month...</h1>
          </div>

        <div className='flex justify-center'>
          <Image 
          className="rounded-md m-2 mx-6"
          height ="220"
          width="240"
          alt="blogpic1"
          src="/images/blogpic1.jpg"
        />


          <Image 
          className="rounded-md m-2 mx-6"
          height ="220"
          width="240"
          alt="blogpic1"
          src="/images/blogpic2.jpg"
        />

        <Image 
          className="rounded-md m-2 mx-6"
          height ="220"
          width="240"
          alt="blogpic5"
          src="/images/blogpic5.jpg"
        />

        <Image 
          className="rounded-md m-2 mx-6"
          height ="200"
          width="240"
          alt="blogpic4"
          src="/images/blogpic4.jpg"
        />
        </div>

        <div className='my-8'>
        <h1 className='text-xl'>Select your picks from the categories and only read those</h1>
         <div className='flex m-6 justify-center'>
         <p className='mx-2 bg-slate-200 p-2 px-4 rounded-full hover:bg-slate-300 cursor-pointer'>React</p>
         <p className='mx-2 bg-slate-200 p-2 px-4 rounded-full hover:bg-slate-300 cursor-pointer'>Next</p> 
         <p className='mx-2 bg-slate-200 p-2 px-4 rounded-full hover:bg-slate-300 cursor-pointer'>Node</p> 
         <p className='mx-2 bg-slate-200 p-2 px-4 rounded-full hover:bg-slate-300 cursor-pointer'>Django</p> 
         <p className='mx-2 bg-slate-200 p-2 px-4 rounded-full hover:bg-slate-300 cursor-pointer'>Mongodb</p> 
         <p className='mx-2 bg-slate-200 p-2 px-4 rounded-full hover:bg-slate-300 cursor-pointer'>SQL</p> 
         <p className='mx-2 bg-slate-200 p-2 px-4 rounded-full hover:bg-slate-300 cursor-pointer'>Python</p> 
         </div>
        </div>


          <div className='flex
           flex-row 
           p-2
           items-center 
           justify-center'>
          <h1 className='text-xl p-4 bg-pink-100 px-4 rounded-full'>Feeling inspired? Create a post</h1>
          <button className={`bg-gray-300 hover:bg-slate-400 p-2 m-4 rounded-full ${showPad ?  'w-11 text-lg' : 'w-12 text-2xl'}`}
          onClick={handleAddPost}>
            {showPad ? 'X' : '+'}
            </button>
          </div>

          {
           showPad &&  (<>
         
         <div className='flex 
         flex-col 
         justify-center 
         items-center'>
          <div>
          
          <TextField 
          id="outlined-basic" 
          label="Title" 
          variant="outlined"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '800px'}}
          />
          </div>

          <div className='pt-4'>
          <TextField
          id="outlined-textarea"
          label="Create a post"
          placeholder="Create a post"
          rows={8}
          multiline
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          style={{ width: '800px'}}
        />
        </div>

        <button className='
        bg-pink-100 
        m-4 p-3 px-5
        text-lg 
        rounded-full 
        hover:bg-pink-200
        '
        onClick={handleSubmit}>Create</button>
        </div>
           </>)}


        </div>
        </div>
  )
}
