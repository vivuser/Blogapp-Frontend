"use client"
import { TextField } from "@mui/material";
import  axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import GitHubIcon from '@mui/icons-material/GitHub';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Login = () => {
const [ name, setName ] =useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [confirmPassword, setConfirmPassword] = useState();
const [register, setRegister] = useState(false)
const [myPosts, setMyPosts] = useState([])
const [showPosts, setShowPosts] = useState(false);
const [editedPost, setEditedPost] = useState({
  title: '',
  content: '',
})
const [ modal, setModal] = useState(false)
const dispatch = useDispatch();
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
const userData = useSelector((state) => state.userData)
const [isLoggedin, setIsLoggedin] = useState(isAuthenticated)
const userId = userData ? userData.userId : null;


const GitHubCallbackComponent = () => {
  const dispatch = useDispatch()  


useEffect(() => {
  console.log("useEffect is running");
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  console.log(code, 'ye rha code')

  if (code) {
    handleGitHubCallBack(code);
  }
}, [window.location.search]);

const handleGitHubCallBack = async (code) => {
  try {
    console.log('koshish krta hun')
    const response = await axios.post('http://localhost:3001/auth/auth/github/callback', { code });

    const userData = response.data;
    console.log(userData, 'userdata puchta hun')
    dispatch(login(userData));

    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (error) {
    console.error(error);
  }
}
}


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
  dispatch(login(userData))

  setEmail("")
  setPassword("")
  setIsLoggedin(true);
} catch (error){
  console.error(error)
}
}



const handleAllUserPost =  async () => {
  try {
    const response = await fetch(`http://localhost:3001/blogs/user/${userId}`) 
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
    _id: _id,
    title: postToEdit.title,
    content: postToEdit.content,
  });

  setModal(true)
  console.log(modal)

}

const handleSaveEdit = async () => {
  console.log(editedPost._id, 'editedPost')
  try {
    const response = await axios.put(
      `http://localhost:3001/blogs/${editedPost._id}`, {
      
      title: editedPost.title,
      content: editedPost.content
  });
} catch (err){
  console.error(err);
}

}

  return (  
      isAuthenticated ? (<>
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

      {
            modal && ( 
              <>
            <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick = {() => setModal(false)}
            >
            </div>
            <div className="text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg z-50 max-w-screen-lg mx-auto p-4">
              <input
              type="text"
              value={editedPost.title}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
              className="text-2xl p-2 w-full my-4"
              />
              <textarea
              value={editedPost.content}
            onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
            className="text-md p-2 w-full"
          />
          <button className="bg-yellow-300 p-2 px-4 rounded-md hover:bg-yellow-400"
          onClick={handleSaveEdit}
          >Save</button>
            </div>
            </>)
            
          }


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
        (<>
          <button className="bg-yellow-300 flex mx-auto p-2 rounded-md hover:bg-yellow-400"
          onClick={handleLogin}>
            Submit
          </button>
          Or Login using
          <button onClick={() => window.location.href = 'http://localhost:3001/auth/auth/github/callback'}>
          <GitHubIcon className="mx-2"/>
          </button>
          </>
          
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