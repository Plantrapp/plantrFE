import React from "react";
import axios from "axios";
import { useContext } from "react";
import Styled from "styled-components";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import useTools from "../../utils/useTools";
import { baseURL } from "../../utils/misc";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

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
      .mint{
        border: 1px solid #1fdbac;
        color: #1fdbac;

      }
    }
  }
  h1, h2 {
    margin: 0;
  }
`;

export default function BlogItem(props) {
  const { blog, fetchBlogPosts, currentUser } = props;
  const date = blog.created_at.split(" ");
  const blogOwner = currentUser.id === blog.author_id;
  const { toastOn } = useContext(CurrentUserContext);
  const { goToPage } = useTools();

  const deletePost = () => {
    axiosWithAuth()
      .delete(`/blog-posts/${blog.id}`)
      .then((res) => {
        fetchBlogPosts(blog.author_id);
        toastOn("successfulDeletePost");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPost = () => goToPage("/dashboard/blog-post/edit", { blog });
  const read = () => goToPage(`/dashboard/blogs/${blog.id}`);

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
        {blogOwner ? (
          <>
            <div className="blog-container-button">
              <button onClick={editPost}>Edit</button>
            </div>
            <div className="blog-container-button">
              <button className="delete" onClick={deletePost}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="blog-container-button"></div>
            <div className="blog-container-button">
              <button className="mint" onClick={read}>
                Read
              </button>
            </div>
          </>
        )}
      </div>
    </StyledBlogItem>
  );
}
