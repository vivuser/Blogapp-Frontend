'use client'

import { Drawer, TextField } from "@mui/material";
import { useEffect, useState } from "react"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { useUser } from "../../../../context/UserContext";
import { Edit } from "@mui/icons-material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

export default function SinglePost({params}) { 
    const [post, setPost] = useState(null);
    const [addComment, setAddComment] = useState('');
    const [showComment, setShowComment] = useState([]);
    const [showCommentPad, setShowCommentPad] =useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const dispatch = useDispatch();

    const router = useRouter();

    const { userName } = useUser(); 

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true)
    }

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false)
    } 

    const fetchPost = async (id) => {
        const res = await fetch(`http://localhost:3001/blogs/${id}`)      
        const  post   = await res.json();
        post && setPost(post);
    }

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
            if (isAuthenticated) {
                setShowCommentPad((prev)=>!prev)
            }else {
                router.push('/login');
            }
        }

        {console.log(post, 'poast')}



    return (
        <div className="p-6 max-w-screen-lg mx-auto">
            {post && post.length > 0 && ( <>
                <h1 className="text-3xl font-bold flex items-center justify-center p-2 m-4">{post[0].title}</h1>
                <div className="bg-gray-50">
                <div className="border-t border-gray-200"></div>
                <div className="flex justify-between m-4">
                <h3>Tags: 
                <span className="underline underine-offset-2 p-2 text-yellow-600 font-bold text-lg">{post[0].tags}</span></h3>
                <button onClick={handleOpenDrawer}><MapsUgcOutlinedIcon/></button>
                <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                transitionDuration={{ enter: 500, exit: 500 }}>
                    <div style={{ width: '650px', padding:'16px'}}>
                    <div className="font-bold mt-10 mb-10">
                    <div className="flex">
                    <h1 className="ml-1 p-3 text-xl text-slate-600 underline underline-offset-2">Add comments</h1>
                    <button className="mx-1 p-1 rounded-full w-10 text-3xl"
                    onClick={handleShowCommentPad}>
                        {showCommentPad ?<CommentsDisabledIcon/> : <CommentIcon/>}</button>
                    </div>


                   {showCommentPad &&
                    <div className="flex mt-4">
                    <TextField 
                    id="standard-basic" 
                    label="Your Comments" 
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
                
                   

                <div className="bg-slate-50">
                    <h2 className="text-2xl font-bold bg-slate-200 p-4">Comments</h2>
                    <ul>
                        {post && post.length >0 && (<>
                        {(post[0].comment)?.map((comment) => (
                        <div className="flex justify-between m-4">
                        <li key={comment._id} className="text-md text-yellow-800 my-4 ml-3">{userName?.split(' ')[0]}:<span className="text-black text-xl m-2">{comment.text}</span>
                        </li>
                        <EditNoteIcon/>
                        </div>
                        ))
                        } </>)}
                    </ul>
                </div>
                    </div>
                </Drawer>
                </div>
                <div className="border-t border-gray-200"></div>
                </div>
            <article className="flex items-center justify-center m-8">
                <p className="text-lg flex items-center justify-center text-gray-600">{post[0].content}</p>
            </article>
            </>)}




        </div>
    )

}