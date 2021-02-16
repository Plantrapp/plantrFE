import React from "react";
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

const blog = {
  id: 1,
  topic: "nature",
  title: "Keeping crops warm all winter long",
  author: "clone5",
  description:
    "Here are some tips for staying warm when both the temperature and the electricity drops off.",
};

export default function Blog() {
  return (
    <StyledBlog>
      <h1>{blog.title}</h1>
      <p>by {blog.author}</p>
      <hr />
      <div className="blog-content">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iure
          ullam numquam voluptate totam labore. Hic asperiores nam in recusandae
          iure assumenda, beatae vero dolor cupiditate eaque laudantium, a
          possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Facere iure ullam numquam voluptate totam labore. Hic asperiores nam
          in recusandae iure assumenda, beatae vero dolor cupiditate eaque
          laudantium, a possimus.
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iure
          ullam numquam voluptate totam labore. Hic asperiores nam in recusandae
          iure assumenda, beatae vero dolor cupiditate eaque laudantium, a
          possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Facere iure ullam numquam voluptate totam labore. Hic asperiores nam
          in recusandae iure assumenda, beatae vero dolor cupiditate eaque
          laudantium, a possimus.
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iure
          ullam numquam voluptate totam labore. Hic asperiores nam in recusandae
          iure assumenda, beatae vero dolor cupiditate eaque laudantium, a
          possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Facere iure ullam numquam voluptate totam labore. Hic asperiores nam
          in recusandae iure assumenda, beatae vero dolor cupiditate eaque
          laudantium, a possimus.
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iure
          ullam numquam voluptate totam labore. Hic asperiores nam in recusandae
          iure assumenda, beatae vero dolor cupiditate eaque laudantium, a
          possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Facere iure ullam numquam voluptate totam labore. Hic asperiores nam
          in recusandae iure assumenda, beatae vero dolor cupiditate eaque
          laudantium, a possimus.
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iure
          ullam numquam voluptate totam labore. Hic asperiores nam in recusandae
          iure assumenda, beatae vero dolor cupiditate eaque laudantium, a
          possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Facere iure ullam numquam voluptate totam labore. Hic asperiores nam
          in recusandae iure assumenda, beatae vero dolor cupiditate eaque
          laudantium, a possimus.
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iure
          ullam numquam voluptate totam labore. Hic asperiores nam in recusandae
          iure assumenda, beatae vero dolor cupiditate eaque laudantium, a
          possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Facere iure ullam numquam voluptate totam labore. Hic asperiores nam
          in recusandae iure assumenda, beatae vero dolor cupiditate eaque
          laudantium, a possimus.
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere iure
          ullam numquam voluptate totam labore. Hic asperiores nam in recusandae
          iure assumenda, beatae vero dolor cupiditate eaque laudantium, a
          possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Facere iure ullam numquam voluptate totam labore. Hic asperiores nam
          in recusandae iure assumenda, beatae vero dolor cupiditate eaque
          laudantium, a possimus.
        </p>
      </div>
    </StyledBlog>
  );
}
