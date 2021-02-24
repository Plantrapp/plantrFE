import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";

const StyledBlog = Styled.div`
  width: 85vw;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow-y: auto;
  padding: 5% 10%;
  color: whitesmoke;
  flex-direction: column;
  word-break: break-word;
  pre{
    color: whitesmoke;
    white-space: pre-wrap;       
    white-space: -moz-pre-wrap;  
    white-space: -pre-wrap;      
    white-space: -o-pre-wrap;    
    word-wrap: break-word;       
  }
  hr{
    background: #292929;
    height: 2px;
    width: 80%;
    margin-bottom: 4%; 
  }
  .blog-content{
    text-align: left;
    width: 75%;
  }
`;

export default function Blog() {
  const id = window.document.URL.split("/").pop();
  const [blogInfo, setBlogInfo] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/blog-posts/${id}`)
      .then((res) => {
        setBlogInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(blogInfo);
  return (
    <StyledBlog>
      <h1>{blogInfo.title}</h1>
      <p>by {blogInfo.author}</p>
      <hr />
      <div className="blog-content">
        <pre>{blogInfo.message}</pre>
      </div>
    </StyledBlog>
  );
}
