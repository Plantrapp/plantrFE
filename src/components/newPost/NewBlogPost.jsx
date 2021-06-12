import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { newPostSchema } from "../../validation/formSchema";
import * as yup from "yup";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

const StyledNewPost = Styled.div`
height: 100vh;
background-color: rgba(255, 255, 255, 0.05);
overflow-y: auto;
color: white;
text-align: left;
width: 60%;
margin: 0 auto;
border-radius: 10px;
padding: 0 4%;
width: 85vw;
display: flex;
flex-direction: column;
/* justify-content: center; */

.postPreview {
  
    text-align: center;
  
}

h3 {
  text-align: center;
  margin-bottom: 0;
}
p{
  text-align: center;
  color: red;
}
hr {
  background-color: white;
}
input, textarea {
  width: 100%;
}
input::placeholder {
  color: #9b9b9b;
}
.form-heading{
  display: flex;
  justify-content: space-between;
  align-items: center;
  button{
    background: none;
    border: none;
    transition: 0.3s ease-in-out;
    color: whitesmoke;
    &:hover{
      background: #292929;
      cursor: pointer;
    }
  }
}
.form-group {
  display: flex;
  align-items: center;
  .form-label {
    width: 40%;
    padding-left: 2%;
    font-weight: bold;
  }
  .form-input {
    width: 60%;
  }
}
label {
  margin: 0;
}
.button {
  text-align: center;
  margin: 1% 0 3% 0;

  display: flex;
  justify-content: center;
  width: 100%;
  .cta-button-disabled, cta-button{
    transition: 0.3s ease-in-out;
    display: flex;
    padding: 0.8%;
    background: transparent;
    color: whitesmoke;
    border: 1px solid rgba(245, 245, 245, 0);
    border-radius: 5px;
    width: 20%;
    align-items: center;
    justify-content: center;
  }
  .cta-button{
    transition: 0.3s ease-in-out;
    display: flex;
    padding: 0.8%;
    background: transparent;
    color: whitesmoke;
    border-radius: 5px;
    width: 20%;
    align-items: center;
    justify-content: center;
    border: 1px solid whitesmoke;
    &:hover {
      background: #292929;
    }
  }
    span{
      margin-right: 5%;
    }
  }
}
.featureless-input{
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgb(255, 255, 255);
    outline: none;
    width: 100%;
    color: rgb(255, 255, 255);
    margin: 2% 0;
    width: 30vw;
  }
  .featureless-input:focus{
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px solid rgb(255, 255, 255);
    border-radius: 0;
    outline-style: none;
    text-decoration: none;
    color: rgb(255, 255, 255);

  }
`;
const initFormValues = {
  title: "",
  category: "general",
  description: "",
  message: "",
};
export default function NewPost(props) {
  const [formValues, setFormValues] = useState(initFormValues);
  const [formErrors, setFormErrors] = useState(initFormValues);
  const [disabled, setDisabled] = useState(false);
  const { currentUser, toastOn } = useContext(CurrentUserContext);
  const { changeComponent } = props;
  const handleSubmit = (e) => {
    e.preventDefault();

    const post = formValues;
    post.author_id = currentUser.id;
    post.author = currentUser.username;
    post.created_at = new Date().toString();

    axiosWithAuth()
      .post(`/blog-posts/`, post)
      .then(() => {
        setFormValues(initFormValues);
        toastOn("successfulNewPost");
      })
      .catch(() => {
        toastOn("invalidNewPost");
      });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    if (name !== "description" && name !== "category") {
      yup
        .reach(newPostSchema, name)
        .validate(value)
        .then(() => {
          setFormErrors({
            ...formErrors,
            [name]: "",
          });
        })
        .catch((err) => {
          setFormErrors({
            ...formErrors,
            [name]: err.errors[0],
          });
        });
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    newPostSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <StyledNewPost>
      <div
        className="button"
        style={{ justifyContent: "space-evenly", paddingTop: "2%" }}
      >
        <button className="cta-button" onClick={() => changeComponent(1)}>
          New Portfolio Piece
        </button>
        <button className="cta-button" onClick={() => changeComponent(2)}>
          New Blog Post
        </button>
      </div>
      <hr style={{ width: "100%", background: "whitesmoke" }} />
      <Form onSubmit={handleSubmit}>
        <div className="form-heading">
          <h3>New Blog Post</h3>
        </div>

        <Form.Group className="form-group">
          <div className="form-label">
            <label>Title*</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.title}
              name="title"
              style={{ background: "transparent", color: "whitesmoke" }}
            />
          </div>
        </Form.Group>
        <p>{formErrors.title}</p>

        <Form.Group className="form-group">
          <div className="form-label">
            <label>Short Description</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.description}
              name="description"
              style={{ background: "transparent", color: "whitesmoke" }}
              maxLength="100"
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <div className="form-label">
            <label>Category</label>
          </div>
          <div className="form-input">
            <select
              style={{ background: "transparent", color: "whitesmoke" }}
              onChange={handleOnchange}
              value={formValues.category}
              name="category"
            >
              <option value="General">General</option>
              <option value="Planting">Planting</option>
              <option value="Sustainability">Sustainability</option>
            </select>
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <div className="form-label">
            <label>Message*</label>
          </div>
          <div className="form-input message">
            <textarea
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.message}
              name="message"
              rows="10"
              style={{
                background: "transparent",
                color: "whitesmoke",
                border: "1px solid whitesmoke",
              }}
            />
          </div>
        </Form.Group>
        <p>{formErrors.message}</p>

        <div className="button">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`clamped-text ${
              disabled ? "cta-button-disabled" : "cta-button"
            }`}
            disabled={disabled}
          >
            Post
          </button>
        </div>
      </Form>
    </StyledNewPost>
  );
}
