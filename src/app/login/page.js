"use client"
import { TextField } from "@mui/material";
import { useState } from "react";

const Login = () => {
const [data,setData]=useState();
const [password,setPassword]=useState();

    return (
        <div className="m-6">
            <h1 className="flex justify-center m-4">Login and save your posts</h1>
        <TextField
          id="outlined-error-helper-text"
          label="email"
          value={data}
          onChange={(e)=>setData(e.target.value)}
          className="m-4"
        />
             <TextField
          id="outlined-error-helper-text"
          label="password"
          value={data}
          onChange={(e)=>setData(e.target.value)}
          className="m-4"
        />
        </div>
    )
}

export default Login;