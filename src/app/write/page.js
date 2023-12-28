"use client"
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './write.css';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';


const Write = () => {
    const [open, setOpen] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [title, setTitle] =useState("")
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.userData);

    const userId = JSON.parse(localStorage.getItem('userData'))?.userId

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

            // setValue((prevValue) => ( 
            //     prevValue.substring(0, value.length) + 
            //     `\n![Alt text](${uploadedImageUrl})\n`  +
            //     prevValue.substring(value.length)
            // ));
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
              title, 
              content: postContent,
            //   tags :postTopics,
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


    return (
        <div className='max-w-3xl mx-auto flex flex-col'>   
            <input type="text" placeholder="Title" className='mt-10 text-3xl border-none outline-none'
            onChange={(e) => setTitle(e.target.value)}/> 
            <div className='flex items-start mt-4'>
                <button className='float-left' onClick={handleOpenAttachment}><ControlPointIcon/></button>
            </div>  
            { open && (
                <div className='fex flex-row bg-slate-200 mx-auto shadow-md border rounded-full'>
                    <label className='m-2 p-1 hover:bg-white rounded-md'>
                        <input type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }}/>
                        <AddPhotoAlternateIcon/>
                    </label>
                </div>)
            }

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
            className='bg-yellow-300 rounded-full px-3 py-2 mx-auto hover:bg-yellow-400'>
                Publish
            </button>
        </div>  
    );
}

export default Write;
