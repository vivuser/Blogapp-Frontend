"use client"
import { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";

const GitHubCallbackPage = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code, 'ye rha code');

    if (code) {
        window.location.href = `http://localhost:3001/auth/github/callback?code=${code}`;
      }

  }, []);

  return <div>Redirecting ..</div>;
};

export default GitHubCallbackPage;
