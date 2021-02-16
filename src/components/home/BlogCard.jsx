import React from "react";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";

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
}
span{color: #1fdbac}
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
  const { id, topic, title, author, description } = props.post;
  const history = useHistory();
  const goToBlogPost = () => {
    history.push(`/dashboard/blogs/${id}`);
  };
  return (
    <StyledBlogCard>
      <div className="heading">
        <p>{topic}</p>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>

      <p>
        by <span>{author}</span>
      </p>

      <footer>
        <button onClick={goToBlogPost}>Read More</button>
      </footer>
    </StyledBlogCard>
  );
}
