"use client"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddLinkIcon from '@mui/icons-material/AddLink';
import './write.css';
import axios from 'axios';

const Write = () => {
    const [open, setOpen] =useState(false);
    const [value, setValue] = useState('');
    const [imageUrl, setImageUrl] = useState(null)

    const handleOpenAttachment = () => {
        setOpen((prev) => !prev)
    }

    const handleImageUpload = async (e) => {
    try {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file); 

        const response = await axios.post('http://localhost:3001/blogs/image', formData)
        const uploadedImageUrl = response.data.imageUrl
        setImageUrl(uploadedImageUrl)

        console.log('Before setValue - imageUrl:', imageUrl);
        setValue((prevValue) => ( 
            prevValue.substring(0, value.length) + 
            `\n![Alt text](${imageUrl})\n`  +
            prevValue.substring(value.length)
        ));
        console.log('After setValue - value:', value);
        } catch (error) {
            console.error('Error uploading image:', error)
        }
    }

    return (
    <div className='max-w-3xl mx-auto flex flex-col'>   
    <input type="text" placeholder="Title" className='mt-10 text-3xl border-none outline-none'/> 
    <div className='flex items-start mt-4'>
    <button className='float-left' onClick={handleOpenAttachment}><ControlPointIcon/></button>
    </div>  
    { open && (
    <div className='fex flex-row bg-slate-200 mx-auto shadow-md border rounded-full'>
    <label className='m-2 p-1 hover:bg-white rounded-md'>
        <input type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }}/>
        <AddPhotoAlternateIcon/>
    </label>
    {/* <button className='float-left m-2 p-1 hover:bg-white rounded-md'><VideoCallIcon/></button>
    <button className='float-left m-2 p-1 hover:bg-white rounded-md'><AddLinkIcon/></button> */}
    </div>)
}

    <ReactQuill 
    className='rounded-md p-2 h-80 custom-quill'
    theme="bubble"
    value={value}
    onChange={setValue}
    placeholder='Tell your story'
   />

    <button className='bg-yellow-300 rounded-full px-3 py-2 mx-auto hover:bg-yellow-400'>
    Publish
    </button>
    </div>  

   )

}

export default Write;