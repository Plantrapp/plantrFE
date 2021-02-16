import React from "react";
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
`;

export default function BlogList() {
  const posts = [
    {
      id: 1,
      topic: "nature",
      title: "Keeping crops warm all winter long",
      author: "clone5",
      description:
        "Here are some tips for staying warm when both the temperature and the electricity drops off.",
    },
    {
      id: 2,
      topic: "planting",
      title: "Planting grapes 101",
      author: "clone4",
      description: "Here are some tips for planting grapes in your location.",
    },
    {
      id: 3,
      topic: "sustainability",
      title: "Fastest growing crops in town",
      author: "clone3",
      description:
        "The full list of the best sustainable crops that will feed many.",
    },
    {
      id: 4,
      topic: "plants",
      title: "No description blog",
      author: "clone2",
      description: "",
    },
    {
      id: 5,
      topic: "growing",
      title: "First post",
      author: "clone1",
      description:
        "Here are some tips for staying warm when both the temperature and the electricity drops off.",
    },
  ];
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
