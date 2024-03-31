"use client"
import React, { useState, useEffect } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './write.css';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { openSnackbar, closeSnackbar } from '../redux/commonSlice';
import AutohideSnackbar from '../components/Snackbar';



const Write = () => {

    const [open, setOpen] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] =useState('')
    const [postTopics, setPostTopics] = useState('')
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData);

    if (typeof window !== "undefined") {
    const userId = JSON.parse(localStorage.getItem('userData'))?.userId
    }

    useEffect(() => {
        console.log('imageUrl has been updated:', imageUrl);
    }, [imageUrl]);

    const handleOpenAttachment = () => {
        setOpen((prev) => !prev);
    }

    const handleImageUpload = async (e) => {
        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:3001/blogs/image', formData);
            const uploadedImageUrl = response.data.imageUrl;
            setImageUrl(uploadedImageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }


    
    const handleSubmit = async () => {

        try {
          const response = await fetch('http://localhost:3001/blogs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: title, 
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
            setImageUrl('')
            dispatch(
                openSnackbar({
                content: 'Post created successfully',
                color: 'success'
            })
            )
          } else {
            console.error('Failed to create the post');
            dispatch(
                openSnackbar({
                content: 'Error creating post',
                color: 'error'
            })
            )
            dispatch(closeSnackbar());
          }
        } catch (error) { 
          console.log(userData.name)
          console.error('Error submitting post:', error)
        }
    }



    return  (
        <div className='max-w-3xl mx-auto flex flex-col'>   
        <AutohideSnackbar />

            <input type="text" placeholder="Title" className='mt-10 text-3xl border-none outline-none'
            onChange={(e) => setTitle(e.target.value)}/> 
            <input type="text" placeholder='Give your post a tag' className='outline-none p-2 text-yellow-900'
            onChange={(e) => setPostTopics(e.target.value)}/>
            
            <div className='flex items-start mt-4'>
                <button className='float-left' onClick={handleOpenAttachment}><ControlPointIcon/></button>
                { open && (
                <div className='outline mx-4 shadow-md border text-slate-500'>
                    <label className='m-2 p-1 hover:bg-white rounded-md'>
                        <input type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }}/>
                        <AddPhotoAlternateIcon/>
                    </label>
                </div>)
            }
            </div>  


        {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-full h-auto" height={100} width={100}/>}


            <ReactQuill 
                className='rounded-md p-2 h-80 custom-quill'
                theme="bubble"
                value={postContent}
                onChange={setPostContent}
                placeholder='Tell your story'
            />

            <button 
            onClick={handleSubmit}
            className={`bg-${title.length ? 'yellow-300' : 'yellow-100'} rounded-full px-3 py-2 mx-auto
                     hover:bg-yellow-400 font-bold text-slate-800`}
            >
                Publish
            </button>
        </div>  
    )
}

export default Write;
