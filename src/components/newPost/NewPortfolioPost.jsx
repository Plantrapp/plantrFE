import React, { useState } from "react";

import { Form } from "react-bootstrap";

export default function NewPortfolioPost() {
  const [formValue, setFormValue] = useState("");

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "samuel-brown",
      uploadPreset: "prof_pic",
      sources: ["local", "url", "camera", "facebook", "instagram"],
    },
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    }
  );

  const openWidget = () => {
    widget.open();
  };

  return (
    <div>
      <Form>
        <div className="form-heading">
          <h3>New Blog Post</h3>
        </div>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>Description*</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={(e) => setFormValue(e.target.value)}
              value={formValue}
              name="description"
            />
          </div>
        </Form.Group>
        <button type="button" onClick={openWidget}>
          Here
        </button>

        <hr />
      </Form>
    </div>
  );
}
