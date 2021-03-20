import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { newPostSchema } from "../../validation/formSchema";
import * as yup from "yup";

const StyledSettings = Styled.div`
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
justify-content: center;

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
  // subtitles: [],
  // paragraphs: [],
  // media: [],
  description: "",
  message: "",
};
export default function NewPost() {
  const [formValues, setFormValues] = useState(initFormValues);
  const [formErrors, setFormErrors] = useState(initFormValues);
  const [disabled, setDisabled] = useState(false);
  const { currentUser, toastOn } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = formValues;
    post.author_id = currentUser.id;
    post.author = currentUser.username;
    post.created_at = new Date().toString();

    console.log(post);

    axios
      .post(`https://obscure-beyond-36960.herokuapp.com/blog-posts/`, post)
      .then((res) => {
        console.log("Updated", res);
        setFormValues(initFormValues);
        toastOn("successfulNewPost");
      })
      .catch(() => {
        toastOn("invalidNewPost");
      });
  };

  // const handleNewSections = (e) => {
  //   setFormValues({
  //     ...formValues,
  //     [e.target.name]: [...formValues[e.target.name], e.target.value],
  //   });
  // };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name !== "description") {
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
    <StyledSettings>
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
            />
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <div className="form-label">
            <label>Category</label>
          </div>
          <div className="form-input">
            <select style={{ background: "transparent", color: "whitesmoke" }}>
              <option value="general">General</option>
              <option value="planting">Planting</option>
              <option value="sustainability">Sustainability</option>
            </select>
          </div>
        </Form.Group>

        {/* <Form.Group>
          <div className="form-label">
            <label>Add more content</label>
          </div>
          <div>
            <button
              type="button"
              value={""}
              name="subtitles"
              onClick={handleNewSections}
            >
              New subtitle
            </button>
            <button type="button">New media</button>
            <button type="button">New paragraph</button>
          </div>
        </Form.Group> */}
        {/* {formValues.subtitles.length > 0 ? (
          <Form.Group className="form-group">
            <div className="form-label">
              <label>Subtitle</label>
            </div>
            <div className="form-input">
              <input
                className="featureless-input"
                type="text"
                onChange={handleNewSections}
                value={formValues.subtitles[formValues.subtitles.length - 1]}
                name="subtitles"
              />
            </div>
          </Form.Group>
        ) : null} */}
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
      {/* <div className="postPreview">
        <h2>{formValues.title}</h2>
        <h5>{formValues.description}</h5>
        <h4>{formValues.subtitles[formValues.subtitles.length - 1]}</h4>

        <p>{formValues.message}</p>
      </div> */}
    </StyledSettings>
  );
}
