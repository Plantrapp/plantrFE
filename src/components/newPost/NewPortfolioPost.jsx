import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { CurrentUserContext } from "../../utils/contexts/Contexts";

import { Form } from "react-bootstrap";

export default function NewPortfolioPost() {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { currentUser, toastOn } = useContext(CurrentUserContext);

  //   let widget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: "samuel-brown",
  //       uploadPreset: "prof_pic",
  //       sources: ["local", "url", "camera", "facebook", "instagram"],
  //     },
  //     (err, res) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log(res);
  //     }
  //   );

  //   const openWidget = () => {
  //     widget.open();
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", selectedImage);
    formData.append("description", description);
    formData.append("username", currentUser.username);
    formData.append("user_id", currentUser.id);

    axios
      .post(
        "https://obscure-beyond-36960.herokuapp.com/portfolio-posts",
        formData
      )
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
    <div>
      {currentUser && (
        <Form onSubmit={handleSubmit}>
          <div className="form-heading">
            <h3>New Blog Post</h3>
          </div>
          <hr />
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

          <hr />
        </Form>
      )}
    </div>
  );
}
