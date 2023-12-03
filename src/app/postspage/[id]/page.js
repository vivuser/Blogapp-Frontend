'use client'

import { useEffect, useState } from "react"

export default function SinglePost({params}) { 
    const [post, setPost] = useState(null);
    const [addComment, setAddComment] = useState('');
    const [showComment, setShowComment] = useState([]);

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


    return (
        <div className="p-6">
                <h1 className="text-3xl font-bold flex items-center justify-center p-2 text-orange-300">{post?.title}</h1>
            <article className="flex items-center justify-center">
                <p className="text-xl flex items-center justify-center">{post?.content}</p>
            </article>


            <div className="font-bold mt-10">
                    <h1 className="text-xl text-orange-300">Say something...</h1>
                <input placeholder= "Add comments" className="p-2 border border-t-2 border-black h-16 w-96"
                value={addComment}
                onChange={e=>setAddComment(e.target.value)}></input>
                </div>
                <button className="bg-yellow-400 pl-4 pr-4 mt-3 mb-6 rounded-md hover:bg-yellow-300 text-md"
                onClick={handleComment}>Post</button>

                <div>
                    <h2 className="text-2xl font-semibold text-orange-400 underline">Comments</h2>
                    <ul>
                        {(post?.comment)?.map((comment) => (
                        <li key={comment._id} className="">{comment.text}</li>
                        ))
                        }
                    </ul>
                </div>

        </div>
    )

}