import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Styled from "styled-components";
import BlogCard from "./BlogCard";

const StyledBlogList = Styled.div`
  width:  85vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  hr{
    background: #292929;
    height: 2px;
    width: 80%;
  }
  .new {
    color: white;
  }
`;

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog-posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <StyledBlogList>
      {posts.map((post) => (
        <>
          <BlogCard post={post} />
          <hr />
        </>
      ))}
    </StyledBlogList>
  );
}
