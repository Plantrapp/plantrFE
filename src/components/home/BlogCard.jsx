import React from "react";
import Styled from "styled-components";
import useTools from "../../utils/useTools";

import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

const StyledBlogCard = Styled.div`
  border-radius: 10px;
  padding: 2%;
  margin: 1%;
  transition: 0.15s ease-in-out;
  color: whitesmoke;
  text-align: left;
  width: clamp(100px, 80%, 1000px);
  .heading{
    p{
      color: #1fdbac;
    }
    word-wrap: break-word;
  }
  span{
    color: #1fdbac;
    &:hover{
      cursor: pointer;
    }
  }
  footer{
    display: flex;
    justify-content: flex-end;
    button{
      background: transparent;
      border-radius: 4px;
      transition: 0.3s ease-in-out;
      border: none;
      color: whitesmoke;
      padding: 1%;

      &:hover {
        background: #303030;
      }
    }
  }

`;

export default function BlogCard(props) {
  const { id, category, title, author, description } = props.post;
  const { goToPage } = useTools();
  const username = sessionStorage.getItem("username");

  const goToBlogPost = () => goToPage(`/dashboard/blogs/${id}`);
  const goToAuthorPage = async () => {
    if (author === username) {
      goToPage("/dashboard/user-profile");
      return;
    }
    await axiosWithAuth()
      .get(`/user/info/${author}`)
      .then((res) => {
        const growr = res.data[0];
        goToPage(`/dashboard/growrProfile/${author}`, growr);
      });
  };
  return (
    <StyledBlogCard>
      <div className="heading">
        <p>{category}</p>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>

      <p>
        by <span onClick={goToAuthorPage}>{author}</span>
      </p>

      <footer>
        <button onClick={goToBlogPost}>Read More</button>
      </footer>
    </StyledBlogCard>
  );
}
