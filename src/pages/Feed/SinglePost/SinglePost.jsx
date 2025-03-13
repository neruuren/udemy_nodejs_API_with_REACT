import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

const SinglePost = () => {
  const { postId } = useParams(); // Récupère l'ID depuis l'URL
  const [post, setPost] = useState({
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8080/feed/post/${postId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    })  
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch post');
        }
        return res.json();
      })
      .then(resData => {
        setPost({
          title: resData.post.title,
          author: resData.post.creator.name,
          image: 'http://localhost:8080/' + resData.post.imageUrl,
          date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
          content: resData.post.content
        });
      })
      .catch(err => console.error(err));
  }, [postId]);

  return (
    <section className="single-post">
      <h1>{post.title}</h1>
      <h2>Created by {post.author} on {post.date}</h2>
      <div className="single-post__image">
        <Image contain imageUrl={post.image} />
      </div>
      <p>{post.content}</p>
    </section>
  );
};

export default SinglePost;