import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { baseURL } from "../../utils/misc";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledForm = styled.div`
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.05);
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
  .featureless-input {
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
  .featureless-input:focus {
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px solid rgb(255, 255, 255);
    border-radius: 0;
    outline-style: none;
    text-decoration: none;
    color: rgb(255, 255, 255);
  }
`;

export default function NewPortfolioPost() {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { currentUser, toastOn } = useContext(CurrentUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", selectedImage);
    formData.append("description", description);
    formData.append("username", currentUser.username);
    formData.append("user_id", currentUser.id);

    axios
      .post(`${baseURL}/portfolio-posts`, formData)
      .then((res) => {
        setSelectedImage(null);
        setDescription("");
        toastOn("successfulNewPost");
      })
      .catch(() => {
        toastOn("invalidNewPost");
      });
  };

  return (
    <StyledForm>
      {currentUser && (
        <Form onSubmit={handleSubmit}>
          <div className="form-heading">
            <h3>New Blog Post</h3>
          </div>

          <Form.Group>
            <div className="form-label">
              <label>Profile Picture:</label>
            </div>
            <input
              type="file"
              name="prof_pic"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <div className="form-label">
              <label>Description*</label>
            </div>
            <div className="form-input">
              <input
                className="featureless-input"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Form.Group>
          {/* <button type="button" onClick={openWidget}>
          Here
        </button> */}
          <button>Submit</button>
        </Form>
      )}
    </StyledForm>
  );
}
