"use client"
import { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { login } from '@/app/redux/authSlice';


const GitHubCallbackPage = () => {
  const dispatch = useDispatch();

const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
const [userData, setUserData ] = useState([]);


useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    handleGitHubCallBack(code);
  }
}, []);

const handleGitHubCallBack = async (code) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/github/callback', { code });
    const userinfo = response.data;
    dispatch(login(userinfo));
    // Handle any additional logic or redirect as needed
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

  return (
  <div>
    Redirecting ...
  </div>);
};

export default GitHubCallbackPage;
