import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";
const StyledBlogItem = Styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid whitesmoke;
  padding: 0 2%;

  .blog-container{
    text-align: left;
    display: flex;
    height: 100%;
    width: 100%;
    div{
      display: flex;
      flex-direction: column;
      strong{
        justify-self: flex-start;
        color: #1fdbac;
      }
      .strong-tag{
        height: 20%;
      }
      .the-rest{
        height: 80%;
      }
    }
    .blog-container-title{
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
    }
    .blog-container-date{
      width: 20%;
    }
    .blog-container-button{
      width: 15%; //total 40%
      justify-content: center;
      align-items: center;
      button{
        width: 50%;
        background: transparent;
        color: whitesmoke;
        border: 1px solid whitesmoke;
        border-radius: 5px;
        padding: .5%;
        transition: 0.3s ease-in-out;
        &:hover{
          background: #525151;
        }
      }
      .delete{
        color: #f86b6b;
        border: 1px solid #f86b6b;;
        &:hover{
          background: #4e1d1d;;
        }
      }
    }
  }
  h1, h2 {
    margin: 0;
  }
`;

export default function BlogItem(props) {
  const { blog, fetchBlogPosts } = props;
  const date = blog.created_at.split(" ");
  console.log(date);
  const deletePost = () => {
    axios
      .delete(`http://localhost:5000/blog-posts/${blog.id}`)
      .then((res) => {
        console.log(res);
        fetchBlogPosts(blog.author_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const history = useHistory();
  const editPost = () => {
    history.push("/dashboard/blog-post/edit", { blog });
  };
  return (
    <StyledBlogItem>
      <div className="blog-container">
        <div className="blog-container-title">
          <div className="strong-tag">
            <strong>Title</strong>
          </div>
          <div className="the-rest">
            <h2>{blog.title}</h2>
          </div>
        </div>
        <div className="blog-container-date">
          <div>
            <strong>Date</strong>
          </div>
          <div>
            <h2>
              {date[1]} {date[2]} {date[3]}
            </h2>
          </div>
        </div>
        <div className="blog-container-button">
          <button onClick={editPost}>Edit</button>
        </div>
        <div className="blog-container-button">
          <button className="delete" onClick={deletePost}>
            Delete
          </button>
        </div>
      </div>
    </StyledBlogItem>
  );
}
