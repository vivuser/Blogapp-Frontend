import Link from "next/link";
import { format } from 'date-fns';
import axios from "axios";

export default async function Postpage() {


  const res = await axios('http://localhost:3001/blogs')
  const posts = res.data
  console.log(res, 'jjj')

  return (
    <>
      <div>
        <h1 className="flex justify-center items-center text-2xl m-4 font-bold">Featured</h1>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-wrap">
        {posts?.map(post => (
          <div key={post?._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"> 
            <article className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105">
              <Link href={`/postspage/${post._id}`}>
                <div className="p-6 h-60 w-80 bg-white flex flex-col justify-space-between justify-between overflow-hidden">
                  <h2 className="text-xl font-bold text-yellow-400">{post?.title}</h2>
                  <h4 className="mb-2">{format(new Date(post?.createdAt), 'MMMM dd, yyyy')}</h4>
                  <p className="text-gray-600 flex-1">{post?.content.substring(0, 100)}...</p>
                  <h4 className="">{post?.author}<span className="m-1 text-orange-400">in {post?.tags}</span></h4>
                </div>
              </Link>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}
