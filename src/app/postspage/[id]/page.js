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

    const fetchComments = async(postId) => {
        try {
            const res = await fetch(`http://localhost:3001/blogs/${postId}/comments`);
            const comments = await res.json();
            setShowComment(comments)
        } catch (error) {
            console.error('Error fetching comments', error);
        }
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


    return (
        <div className="p-6">
            <article>
                <h1 className="text-2xl font-bold flex justify-center p-2">{post?.title}</h1>
                <p className="min-h-fit">{post?.content}</p>
            </article>


            <div className="font-bold mt-10">
                    <h1>Add a addComment</h1>
                <input placeholder= "Add comments" className="p-2 border border-t-2 border-black h-16 w-96"
                value={addComment}
                onChange={e=>setAddComment(e.target.value)}></input>
                </div>
                <button className="bg-gray-200 pl-4 pr-4 m-3 rounded-md hover:bg-gray-300"
                onClick={handleComment}>Post</button>

                <div>
                    <h2>Comments</h2>
                    <ul>
                        {showComment?.map((comment) => (
                        <li key={comment._id}>{comment.id}</li>
                        ))
                        }
                    </ul>
                </div>

        </div>
    )

}