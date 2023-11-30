import Link from "next/link";

export default async function PostsPage() {
    
    const res = await fetch('http://localhost:3001/blogs');
    const posts  = await res.json();
    console.log('Posts:', posts);
     

return (
    <div className="p-8">
        <h1 className="flex justify-center text-xl font-bold">All Blog Posts</h1>
        <div className="">
            {posts?.map(post => (
                (<>
                <div className="">
                <article key={post?._id}>
                    <div className=" p-6">
                    <Link href={`postspage/${post._id}`}>
                            <h2 className="text-xl font-bold underline underline-offset-2 bg-gray-200">{post?.title}</h2>
                    <p>{post?.content}</p>
                    </Link>

                    </div>
                </article>
                </div>

               </> )))}
                    </div>
        </div>
)
}