"use client"
import { TextField } from "@mui/material";
import { useState } from "react";

const Login = () => {
const [data,setData]=useState();
const [password,setPassword]=useState();
const [confirmPassword, setConfirmPassword] = useState();
const [signin, setSignIn] = useState(true)
const [register, setRegister] = useState(false)

const handleRegisterClick= () => {
    setRegister((prev)=> !prev)
}

const handleSubmit = async () => {
  const response = await fetch('')
}

    return (
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
          value={data}
          onChange={(e)=>setData(e.target.value)}
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
        <button className="bg-yellow-300 flex mx-auto p-2 rounded-md hover:bg-yellow-400"
        onClick={handleSubmit}>
          Submit
        </button>
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