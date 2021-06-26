import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

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
  .button {
    text-align: center;
    margin: 1% 0 3% 0;

    display: flex;
    justify-content: center;
    width: 100%;
    .cta-button-disabled,
    cta-button {
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
    .cta-button {
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
  }
`;

export default function NewPortfolioPost(props) {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { currentUser, toastOn } = useContext(CurrentUserContext);
  const { changeComponent } = props;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", selectedImage);
    formData.append("description", description);
    formData.append("username", currentUser.username);
    formData.append("user_id", currentUser.id);

    axiosWithAuth()
      .post(`/portfolio-posts`, formData)
      .then(() => {
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
      {currentUser && currentUser.isGrowr ? (
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
      ) : null}
      <hr style={{ width: "100%", background: "whitesmoke" }} />
      {currentUser && (
        <Form onSubmit={handleSubmit}>
          <div className="form-heading">
            <h3>New Portfolio Post</h3>
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
          <div className="button">
            <button
              type="submit"
              onClick={handleSubmit}
              className={`clamped-text cta-button`}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </StyledForm>
  );
}
