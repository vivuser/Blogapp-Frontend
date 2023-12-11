"use client"
import { TextField } from "@mui/material";
import  axios  from "axios";
import { useEffect, useState } from "react";

const Login = () => {
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [confirmPassword, setConfirmPassword] = useState();
const [isLoggedin, setIsLoggedin] = useState(false)
const [register, setRegister] = useState(false)

useEffect(() => {
  const storedUserData = localStorage.getItem('userData');
  if  (storedUserData) {
    setIsLoggedin(true)
  }
}, [])

const handleRegisterClick= () => {
    setRegister((prev)=> !prev)
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
  const response = await axios.post('http://localhost:3001/auth/signup', {
    email,
    password,
    confirmPassword
  });
  console.log(response.data, 'shsgsjgh')
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

  return (  
      isLoggedin ? (<>
      <div className="m-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome back!
      </h1>
      </div>
      <div className="m-4">
      <h2 className="text-lg font-bold">
      Continue Reading where you left
      </h2>
      </div>
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