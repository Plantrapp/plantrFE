import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { newPostSchema } from "../../validation/formSchema";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

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
`;
const initFormValues = {
  title: "",
  category: "general",
  description: "",
  message: "",
};
export default function NewPost() {
  const { blog } = useHistory().location.state;
  const [formValues, setFormValues] = useState(blog);
  const [formErrors, setFormErrors] = useState(initFormValues);
  const [disabled, setDisabled] = useState(false);
  const { currentUser, toastOn } = useContext(CurrentUserContext);
  console.log(blog);
  const history = useHistory();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);

    axios
      .put(`http://localhost:5000/blog-posts/${blog.id}`, formValues)
      .then((res) => {
        console.log("Updated", res);
        setFormValues(initFormValues);
        toastOn("successfulUpdatePost");
        history.goBack();
      })
      .catch(() => {
        alert("Username already in use");
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
          <h3>Edit</h3>
        </div>
        <hr />
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
            />
          </div>
        </Form.Group>
        <p>{formErrors.title}</p>
        <hr />
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
            />
          </div>
        </Form.Group>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>Category</label>
          </div>
          <div className="form-input">
            <select>
              <option value="general">General</option>
              <option value="planting">Planting</option>
              <option value="sustainability">Sustainability</option>
            </select>
          </div>
        </Form.Group>
        <hr />
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
            />
          </div>
        </Form.Group>
        <p>{formErrors.message}</p>
        <hr />
        <div className="button">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`clamped-text ${
              disabled ? "cta-button-disabled" : "cta-button"
            }`}
            disabled={disabled}
          >
            Update
          </button>
        </div>
      </Form>
    </StyledSettings>
  );
}
