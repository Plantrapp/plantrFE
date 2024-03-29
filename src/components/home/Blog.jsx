import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import useTools from "../../utils/useTools";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

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
  const { goToPage } = useTools();
  useEffect(() => {
    axiosWithAuth()
      .get(`/blog-posts/${id}`)
      .then((res) => {
        setBlogInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StyledBlog>
      <div style={{ width: "80%", textAlign: "right" }}>
        <button
          style={{ background: "none", border: "none", color: "whitesmoke" }}
          onClick={() => goToPage("/dashboard")}
        >
          <FaTimes />
        </button>
      </div>
      <h1>{blogInfo.title}</h1>
      <p>by {blogInfo.author}</p>
      <hr />
      <div className="blog-content">
        <pre>{blogInfo.message}</pre>
      </div>
    </StyledBlog>
  );
}
