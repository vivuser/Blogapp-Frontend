"use client"
import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicCard() {
  const [postViews, setPostViews] = useState([]);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/blogs/');
        const blogPosts = response.data;
        console.log(blogPosts);

        setPostViews(blogPosts);
      } catch (error) {
        console.error('Error fetching blogs posts:', error)
      }
    };
    fetchBlogPosts();
  }, []);

  const allSortedPosts = postViews.slice().sort((a,b) => b.views - a.views);
  const sortedPosts = allSortedPosts.splice(0,4);
  console.log(sortedPosts, 'sortedposts')

  return ( sortedPosts.map((post) => (
    <Card sx={{ minWidth: 275, margin: '16px' }} key={post.id}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {post.tags}
        </Typography>
        <Typography variant="h6" component="div">
          {post.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {post.tags}
        </Typography>
        <Typography variant="body2">
          {post.content}
        </Typography>
      </CardContent>
    </Card>))

  )
}
