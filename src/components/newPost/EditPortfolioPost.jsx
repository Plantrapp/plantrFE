import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

export default function EditPortfolioPost() {
  return (
    <div>
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
        <button>Submit</button>

        <hr />
      </Form>
    </div>
  );
}