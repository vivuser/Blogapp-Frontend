"use client"
import { TextField } from "@mui/material";
import  axios  from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";


const Login = () => {
const [ userId , setUserId ] = useState(null);
const [ name, setName ] =useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [confirmPassword, setConfirmPassword] = useState();
const [isLoggedin, setIsLoggedin] = useState(false)
const [register, setRegister] = useState(false)
const [myPosts, setMyPosts] = useState([])
const [showPosts, setShowPosts] = useState(false);
const [editedPost, setEditedPost] = useState({
  title: '',
  content: '',
})


useEffect(() => {
  const storedUserData = localStorage.getItem('userData');
  if  (storedUserData) {
    setIsLoggedin(true)
    const userDataObject = JSON.parse(storedUserData);
    const userIdFromStorage = userDataObject.userId;
    setUserId(userIdFromStorage)
    console.log('Updated UserId:', userIdFromStorage);
    console.log(userId)
  }
}, [])


const handleRegisterClick= () => {
    setRegister((prev)=> !prev)
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
  const response = await axios.post('http://localhost:3001/auth/signup', {
    name, 
    email,
    password,
    confirmPassword
  });
  console.log(response.data, 'shsgsjgh')
  setName("")
  setEmail("")
  setPassword("")
  setConfirmPassword("")
} catch (error){
  console.error(error)
}
}

const handleLogin = async (e) => {
  e.preventDefault();
  try{
  const response = await axios.post('http://localhost:3001/auth/login', {
    email,
    password,
  });
  const userData   = response.data;
  localStorage.setItem('userData', JSON.stringify(userData));
  setEmail("")
  setPassword("")
  setIsLoggedin(true);
} catch (error){
  console.error(error)
}
}



const handleAllUserPost =  async () => {
  try {
    const response = await fetch(`http://localhost:3001/blogs/${userId}`) 
    const userPosts = await response.json()
    console.log(userPosts, 'userPosts')
    setShowPosts((prev) => !prev)
    setMyPosts(userPosts)
  } catch (error) {
    console.error(error)
  }
}

const handleDeletePost = async (postId, userId) => {
  try {
    const response = await axios.delete(`http://localhost:3001/blogs/${postId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH
      }`,
      },
      data: { userId }
    });

    if (response.status === 200) {
      const UpdatedPosts = myPosts.filter(post => post._id !== postId);
      setMyPosts(UpdatedPosts)
    }
  } catch (err) {
    console.log(err);
  }
}

const handleEditPost = async (_id, userId) => {

  const response = await fetch(`http://localhost:3001/blogs/${_id}`)
  console.log(response, 'response of single post')
  const postToEdit = myPosts.find(post => post._id === _id);
  setEditedPost({ 
    title: postToEdit.title,
    content: postToEdit.content,
  });



}

const handleSaveEdit = async (postId, userId) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/blogs/${postId}`,
      {
        title: editedPost.title,
        content: editedPost.content
      }, 
      {
        headers: {
          'Authorization': `Bearer ${process.env.AUTH}`,
        },
      }
    );
    if (response.status === 200) {
      const UpdatedPosts = myPosts.map(post => 
        post._id === postId? { ...post, title: editedPost.title, content: editedPost.content } : post
        );
      setMyPosts(UpdatedPosts)
    }
  } catch (err) {
    console.log(err);
  }
}


  return (  
      isLoggedin ? (<>
      <div className="m-4 flex flex-col items-center justify-center">

      <h1 className="text-2xl font-bold">Welcome back!

 
      </h1>
      </div>
      <div className="m-4">
      <h2 className="text-lg font-bold">
      Continue Reading where you left...
      </h2>
      </div>
      <div>
      <button 
      onClick={handleAllUserPost}
      className="bg-white p-2 m-4 text-md rounded-lg shadow-xl hover:bg-gray-100">
        {showPosts ? 'Close my posts' : 'My Posts'}
      </button>
      </div>

      {showPosts && 
      <div className="flex flex-col m-4">
        {
          myPosts?.map(post => {
           return (<>
           <div key={String(post._id)}
           className="bg-gray-100 border p-4 mb-4 rounded">
            <div className="flex justify-between">
            <h1 className="font-bold text-xl mb-2">{post?.title}</h1>
            <button className="text-xs m-2 bg-red-400 p-2 rounded-md text-white font-bold hover:bg-red-500"
            onClick={() =>handleDeletePost(post._id, post.userId)}>DELETE</button>
            </div>
            <div className="flex justify-between">
            <h2 className="text-gray-700">{post?.content}</h2>
            <button className="text-xs m-2 bg-green-400 px-4 p-2 rounded-md text-white font-bold hover:bg-green-500"
            onClick={() => handleEditPost(post._id, post.userId)}>EDIT</button>
            </div>
            </div>
            </>)
          })

        }
      </div>
}
      </>   )
       : 


        <div className="m-6 bg-white p-4 pb-8 max-w-md mx-auto rounded-md shadow-xl">
          {register ? (
            <h1 className="flex justify-center m-4 text-xl font-bold">Register and save your posts</h1>
          ) : 
          (
            <h1 className="flex justify-center m-4 text-xl font-bold">Login to access your posts</h1>
          )
          }
        <div className="flex flex-col max-w-md mx-auto">
            
           { register &&
        <TextField
          id="outlined-error-helper-text"
          label="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="m-3"
        />
           }
        <TextField
          id="outlined-error-helper-text"
          label="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="m-3"
        />
             <TextField
          id="outlined-error-helper-text"
          label="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="m-3"
        />
        {
          register &&          
          ( <TextField
          id="outlined-error-helper-text"
          label="confirm password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className="m-3"
        />)
        }
        </div>
        {register ?
        (
        <button className="bg-yellow-300 flex mx-auto p-2 rounded-md hover:bg-yellow-400"
        onClick={handleSubmit}>
          Submit
        </button>
        ) :
        (
          <button className="bg-yellow-300 flex mx-auto p-2 rounded-md hover:bg-yellow-400"
          onClick={handleLogin}>
            Submit
          </button>
        )
}
        <br/>
        <br/>
        <div className="flex justify-center">
        <h2 className="">Already a user? </h2>
        <button className="px-2 underline-offset-2" style={{ textDecoration: 'underline' }}
        onClick={handleRegisterClick}>{register ? 'Login' : 'Register'}</button>
        </div>
        </div>
    )
}

export default Login;