  'use client'
  import dynamic from 'next/dynamic'
  import React from 'react';
  import { TableCell, TextField } from '@mui/material'
  import { useEffect, useState } from 'react'
  import  axios  from 'axios';
  import { useDispatch, useSelector } from 'react-redux';
  import { useRouter } from 'next/navigation';
  import { CKEditor } from '@ckeditor/ckeditor5-react';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import TimelineIcon from '@mui/icons-material/Timeline';
  import BasicCard from './components/Card';

  
  export default function Home() {

    const [postContent, setPostContent] = useState('');
    const [title, setTitle] = useState('');
    const [showPad, setShowPad] = useState(false);
    const [ topics, setTopics ] =useState([]);
    const [showTags, setShowTags] = useState(false)
    const [postTopics, setPostTopics] = useState('') 
    const [matchingTags, setMatchingTags] = useState([])
    const [imageUrl, setImageUrl] = useState(null);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch();
    const router = useRouter();
    const userData = useSelector((state) => state.userData);

    const availableTags = ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Python', 'Java', 'C#', 'PHP'];

  
    const handleImageUpload = async (file) => {
      if (typeof window !== 'undefined') {
      try { 
      const formData = new FormData();  
      formData.append('file', file);

      const response = await axios.post('http://localhost:3001/blogs/image', formData)
      const uploadedImageUrl = response.data.imageUrl;
      setImageUrl(uploadedImageUrl)
     } catch(error){
      console.error('Error uploading image:', error)
     }
    }
  }

    
    const handleTagInputChange = (e) => {
      if (typeof window !== 'undefined') {
      const inputText = e.target.value.toLowerCase();
      const matchingTags = availableTags.filter((tag) =>
      tag.toLowerCase().includes(inputText));
      setMatchingTags(matchingTags);
      setPostTopics(e.target.value);
    }
  }

    const handleTagSelection = (selectedTag) => {
      if (typeof window !== 'undefined') {
      setPostTopics(selectedTag);
      setMatchingTags([])
      }
    };

    useEffect(() => {
    if (typeof window !== 'undefined') {
    const userId = JSON.parse(localStorage.getItem('userData'))?.userId
    }
  },[]);
    
    const handleSubmit = async () => {

      try {

        const response = await fetch('http://localhost:3001/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title, 
            content: postContent,
            tags :postTopics,
            userId: userId,
            author: userData.name,
            imageUrl: imageUrl
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
    if (isAuthenticated) {
      console.log(isAuthenticated)
    setShowPad((prev) => !prev);
  }
  else {
    console.log(isAuthenticated, 'else isAuthenticated')
    router.push('/login')
  }
  }

  const handleTopicClick = (topic) => {
    console.log(topic)
    setTopics((prevTopics) => {
      if (Array.isArray(prevTopics)) {
        if (prevTopics.includes(topic)) {
          return prevTopics.filter((t) => t!==topic );
        } else {
          return [...prevTopics, topic];
        } 
      } else {
          return [topic]
        }
    })
  }

  const handleClearTopics = () => {
    setTopics([]);
  }

  const handleSaveTopics = async () => {
    try {
    console.log(userId, topics  )
    const response = await axios.put(`http://localhost:3001/blogs/topics/${userId}`,
    {topics: topics},
    )
    } catch (error) {
    console.error(error)
    }
  }
    
  useEffect(() => {
    console.log(topics);
  }, [topics]);

  const showTagsHandler = () => {
      setShowTags((prev) => !prev);
  }

    return (
          <div className=''>
            
          <div className='h-80 bg-yellow-300 flex items-center justify-center'>
              <h1 className='bg-white p-4 font-bold text-lg rounded-3xl hover:rounded-lg'>Blogs for you, by you</h1>
          </div>

            <div className='font-bold m-4 my-6 mx-16'>
            <div className=''>

            <div className='flex'>
            <div className='flex flex-col my-10'>
            <h1 className='text-xl'><span className='mx-3'><TimelineIcon className='outline p-1 h-12 w-12 mx-2 rounded-full shadow-lg'/></span>Most read this month...</h1>
            <div className='flex flex-row'>
            <BasicCard />
            </div>
            </div>
            </div>

            <div className='h-40'>

            </div>

            </div>



          <div className='my-8'>
          <h1 className='text-xl'>
          Select your picks from the categories and only read those
          </h1>
          <div className='flex flex-wrap m-6 justify-center max-w-screen-lg mx-auto bg-pink-100 shadow-lg rounded-full m-8 p-4 px-8'>
          <div className='flex flex-wrap mx-auto items-center justify-center'> 
          {['React', 'Next', 'Node', 'Django', 'Mongodb', 'SQL', 'Python', 'Angular', 'Jmeter', 'Postman', 'Magento', 'Wordpress', 'Dynamodb', 'Javascript', 'Java', 'Selenium', 'Automation', 'Devops', 'Cloud', 'Data Analysis'].map((topic) => (
            <div key={topic}>
            <button
            className={`mx-3 my-3 bg-slate-300 p-2 px-4 rounded-full hover:bg-slate-400 cursor-pointer
            ${topics?.includes(topic) ? 'bg-pink-400 text-white' : ''}`}
            onClick={() => handleTopicClick(topic)}
            >
            {topic} {topics?.includes(topic) && <span>X</span>}
            </button>
          </div>
          ))}
          </div>
          <div className='mt-3'>
            <button className='bg-yellow-300 p-2 px-5 font-bold rounded-md hover:bg-yellow-400'
            onClick={handleClearTopics}>Clear</button>
            <button className='bg-yellow-300 mx-3 p-2 px-5 font-bold rounded-md hover:bg-yellow-400'
            onClick={handleSaveTopics}>Save</button>
            </div>
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

            <div className='text-center fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 mx-auto p-4'>
            <button className='bg-black rounded-full text-white px-4 py-2 m-4 absolute top-4 left-4 z-50'
            onClick={handleAddPost}>Back</button>
          
          <div className='flex 
          flex-col 
          justify-center 
          items-center mt-10'>
            
            <div className='flex flex-col relative'>
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
            <div>
          <button className='bg-slate-600 text-white p-2 my-4 rounded-full left-0 hover:bg-slate-500'
          onClick={showTagsHandler}>Add Tags</button>
          </div>
            </div>

              
            {
              showTags && (
                <div>
            <TextField 
            id="outlined-basic" 
            label="Tags" 
            variant="outlined"
            value={postTopics} 
            onChange={handleTagInputChange}
            style={{ width: '800px'}}
            />
                      {matchingTags.length > 0 && (
              <div>
                {matchingTags.map(tag => (
                  <button className="bg-slate-600 text-white p-1 px-2 m-2 rounded-full" key={tag} onClick={() => handleTagSelection(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            )}
                </div>
              )
            }
            

            <div className='pt-4'>
                          <CKEditor
                      editor={ ClassicEditor }
                      data={postContent}
                      onChange={ ( event,editor ) => {
                          const data = editor.getData();
                          setPostContent(data)
                          console.log( data);
                          }}
                  />
                      <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
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
          </div>

            </>)}


          </div>
          </div>
    )
  }

 