'use client'

import { Drawer, TextField } from "@mui/material";
import { useEffect, useState } from "react"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { Edit } from "@mui/icons-material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import Image from "next/image";
import axios from "axios";


export default function SinglePost({params}) { 
    const [post, setPost] = useState(null);
    const [addComment, setAddComment] = useState('');
    const [showComment, setShowComment] = useState([]);
    const [showCommentPad, setShowCommentPad] =useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [editedCommentId, setEditedCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');
    const [ commentReply, SetCommentReply ] = useState({});
    const [ replyCommentId, setReplyCommentId] = useState(null)
    const [ replyText, setReplyText ] = useState('')
    const [ showMoreComments, setShowMoreComments ] = useState({});
    const [showEditComment, setShowEditComment] = useState(false)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.userData) 
    const dispatch = useDispatch();

    const router = useRouter();

    // const { userName } = useUser(); 

    const handleOpenDrawer = () => {
        setIsDrawerOpen((prev) => !prev)
    }

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false)
    } 

    const fetchPost = async (id) => {
        const res = await fetch(`http://localhost:3001/blogs/${id}`)      
        const  post   = await res.json();
        post && setPost(post);
    }

    const incrementViews = async () => {
        try {
            await axios.post(`http://localhost:3001/blogs/${params.id}/increment-views`)
        } catch (error) {
            console.error('Error incrementing views', error)
            console.log(params.id, 'paramsId')

        }
    }

    useEffect(() => {
        fetchPost(params.id);
        incrementViews();
    }, [])

    const handleComment = async () => {
        try{
            const res = await fetch(`http://localhost:3001/blogs/${params.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ author: userData.name, text: addComment, userId: userData.userId }),
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
                console.log(isAuthenticated)
                router.push('/login');
            }
        }

        {console.log(post, 'poast')}

        const handleEditComment = (commentId,commentText) => {
            setShowEditComment((prev) => !prev)
            setEditedCommentId(commentId);
            setEditedCommentText(commentText);
        }

        const handleSaveEditComment = async (commentId) => {
            try {
                const res = await fetch(`http://localhost:3001/blogs/${params.id}/comments/${commentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: editedCommentText }),
                });

            if (res.ok) {
                fetchPost(params.id);
                setEditedCommentId(null);
                setEditedCommentText("")
            } else {
                console.error('Failed to update comment');
            }
        } catch (error) {
            console.error('Error updating comment', error)
        }
    };

    const handleCommentReply = (replyCommentId, replyText) => {
        SetCommentReply((prev) => !prev);
        setReplyCommentId(replyCommentId);
        setReplyText(replyText);
    }

    const handleSaveReply = async (commentId) => {
        try {
            const res = await fetch(`http://localhost:3001/blogs/${params.id}/comments/${commentId}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author: userData.name, text: replyText, userId: userData.userId })
            });

            if (res.ok) {
                fetchPost(params.id);
                setReplyCommentId(null);
                setReplyText("");
            } else {
                console.error('Failed to post reply');
            }
        } catch (error) {
            console.error('Error posting reply', error);
        }
    };

    const handleShowMore = (commentId) => {
        setShowMoreComments((prev) => {
            return { ...prev, [commentId]: !prev[commentId]}
        })
    }

    const handleCloseCommentField = () => {
        SetCommentReply(false)
    }

    return (
        <div className="p-6 max-w-screen-lg mx-auto">
            {post && post.length > 0 && ( <>
                <h1 className="text-3xl font-bold flex items-center justify-center p-2 m-4">{post[0].title}</h1>
                <div className="bg-gray-50">
                <div className="border-t border-gray-200"></div>
                <div className="flex justify-between m-4">
                <h3>Tags: 
                <span className="underline underine-offset-2 p-2 text-yellow-600 font-bold text-lg">{post[0].tags}</span></h3>
                <h3>Author: 
                <span className="underline underine-offset-2 p-2 text-yellow-600 font-bold text-lg">{post[0].author}</span></h3>
                <h3>Date: 
                <span className="underline underine-offset-2 p-2 text-yellow-600 font-bold text-lg">{format(new Date(post[0].createdAt), 'MMMM dd, yyyy')}</span></h3>
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
                        <div className="flex justify-between m-4 bg-white p-1">
                        <li key={comment._id} className="text-lg text-yellow-800 my-4 ml-3">{comment.author?.split(' ')[0]}:
                        {editedCommentId === comment._id ? (
                        <>
                        <input
                        type="text"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        className="text-black text-xl m-2 w-80"
                        />
                        <button onClick={() => handleSaveEditComment(comment._id)} className="bg-yellow-500 px-2 rounded-md hover:bg-yellow-400 text-sm font-bold">
                            Save
                        </button>
                        <CancelIcon onClick={handleEditComment}/>
                        </>
                        ) : (
                        <span className="text-black text-xl m-2">{comment.text}</span>
                        )
                        }{ comment.replies.length >0 &&
                        <div className="flex ml-10">
                        <h4 className="italic pr-1">{comment.replies[0]?.author}:</h4>
                        <h4 className="text-black italic">{comment.replies[0]?.text}</h4>
                        </div>
                        }
                        {!showMoreComments[comment._id] && comment.replies.length>0 ?
                        <button className="underline underline-offset-1 ml-10" key={comment._id} onClick={() => handleShowMore(comment._id)}>more replies</button>:
                        (comment.replies.length>0 && <button className="underline underline-offset-1 ml-10" key={comment._id} onClick={() => handleShowMore(comment._id)}>hide replies</button>
                        )}
                        {showMoreComments[comment._id] &&   (comment.replies.slice(1).map(reply => {
                            return (<>
                            <div className="flex ml-10">
                        <h4 className="italic pr-1">{reply.author}:</h4>
                        <span className="text-black italic">{reply.text}</span>
                        </div>
                        </>)
                        })
                        )}
                        {
                         commentReply && replyCommentId === comment._id && (<>
                            <div>
                            <input 
                            type="text"
                            value={replyText}
                            variant="standard"
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-80"/>
                            <SendIcon className="bg-yellow-300 p-1 hover:bg-yellow-400"
                            onClick={() => handleSaveReply(comment._id)}/>
                            <CancelIcon className="text-black m-2" onClick={handleCloseCommentField}/>
                            </div> 

                            </>)
                        }
                        </li>
                        <div className="flex items-center">
                       { 
                       isAuthenticated && (userData.userId === comment?.userId) ?
                        <EditNoteIcon onClick={() => handleEditComment(comment._id, comment.text)} className="text-slate-400 hover:text-slate-600"/> : <MapsUgcOutlinedIcon
                        className="text-slate-400 hover:text-slate-600" key={comment._id} onClick={() => handleCommentReply(comment._id,replyText)}/>                      
                        }

                        </div>
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
                {post[0].imageUrl && (<>
                <div>
                <Image src={post[0].imageUrl} alt="Base64 Image" height={500} width={500}/>
                </div>
                </>)
                }
                <div className="text-lg flex items-center justify-center text-gray-600">
                <div dangerouslySetInnerHTML={{__html: post[0].content}} />
                </div>
             

            </article>

            </>)}




        </div>
    )

}