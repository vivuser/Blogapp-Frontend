'use client'

import { TextField } from "@mui/material";
import { useEffect, useState } from "react"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

export default function SinglePost({params}) { 
    const [post, setPost] = useState(null);
    const [addComment, setAddComment] = useState('');
    const [showComment, setShowComment] = useState([]);
    const [showCommentPad, setShowCommentPad] =useState(false)

    const fetchPost = async (id) => {
        const res = await fetch(`http://localhost:3001/blogs/${id}`)      
        const  post   = await res.json();
        post && setPost(post);
    }

    // const fetchComments = async(postId) => {
    //     try {
    //         const res = await fetch(`http://localhost:3001/blogs/${postId}/comments`);
    //         const comments = await res.json();
    //         setShowComment(comments)
    //     } catch (error) {
    //         console.error('Error fetching comments', error);
    //     }
    // }

    useEffect(() => {
        fetchPost(params.id);
    }, [])

    const handleComment = async () => {
        try{
            const res = await fetch(`http://localhost:3001/blogs/${params.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: addComment }),
            });

            if (res.ok) {
                fetchPost(params.id);
                setAddComment('')
            } else {
                console.error('Failed to post addComment');
            }
         } catch (error) {
                console.error('Error posting addComment', error);
            }
        }

        const handleShowCommentPad = () => {
                setShowCommentPad((prev)=>!prev)
        }

        {console.log(post, 'poast')}

    return (
        <div className="p-6 max-w-screen-lg mx-auto">
            {post && post.length > 0 && ( <>
                <h1 className="text-3xl font-bold flex items-center justify-center p-2 m-4">{post[0].title}</h1>
                
            <article className="flex items-center justify-center">
                <p className="text-lg flex items-center justify-center text-gray-600">{post[0].content}</p>
            </article>
            Added in 
            <button className="underline underine-offset-2 p-2 text-yellow-600 font-bold text-lg">{post[0].tags}</button>
            </>)}


            <div className="font-bold mt-10 mb-10">
                    <div className="flex">
                    <h1 className="m-4 p-3 text-xl text-slate-600 bg-white shadow-md rounded-full">Say something</h1>
                    <button className="mx-4 p-1 rounded-full w-10 text-3xl"
                    onClick={handleShowCommentPad}>
                        {showCommentPad ?<MapsUgcOutlinedIcon/>  : <MapsUgcOutlinedIcon/>}</button>
                    </div>


                   {showCommentPad &&
                    <div className="flex mt-4">
                    <TextField 
                    id="standard-basic" 
                    label="Here you go" 
                    value={addComment}
                    onChange={e=>setAddComment(e.target.value)}
                    className="mx-auto"
                    style={{ width: '1000px' }} 
                    variant="standard" />
                <button className="pl-4 pr-4 mt-3 mb-6 rounded-md text-md"
                onClick={handleComment}>
                    <ArrowCircleRightOutlinedIcon
                    fontSize="large"/>
                </button>
                    </div>
}
                </div>
                
                   

                <div>
                    <h2 className="text-2xl font-semibold underline">Comments</h2>
                    <ul>
                        {post && post.length >0 && (<>
                        {(post[0].comment)?.map((comment) => (
                        <li key={comment._id} className="text-md text-gray-500 my-2">{comment.text}</li>
                        ))
                        } </>)}
                    </ul>
                </div>

        </div>
    )

}