import React from "react";

import useTools from "../../utils/useTools";

export default function AccountInfo(props) {
  const { Form, account, changeComponent, FaTimes } = props;
  const { goToPage } = useTools();

  const goToProfile = () => goToPage("/dashboard/user-profile");

  return (
    <Form>
      <div className="form-heading">
        <h3>Account Information</h3>
        <button onClick={goToProfile}>
          <FaTimes />
        </button>
      </div>
      <hr />
      <Form.Group className="form-group">
        <div className="form-label">
          <label>Email:</label>
        </div>
        <div className="form-input">
          <span>{account.email}</span>
        </div>
      </Form.Group>
      <hr />

      <Form.Group className="form-group">
        <div className="form-label">
          <label>Username:</label>
        </div>
        <div className="form-input">
          <span>{account.username}</span>
        </div>
      </Form.Group>
      <hr />

      <Form.Group className="form-group">
        <div className="form-label">
          <label>First Name:</label>
        </div>
        <div className="form-input">
          <span>{account.first_name}</span>
        </div>
      </Form.Group>
      <hr />
      <Form.Group className="form-group">
        <div className="form-label">
          <label>Last Name:</label>
        </div>
        <div className="form-input">
          <span>{account.last_name}</span>
        </div>
      </Form.Group>
      <hr />
      <Form.Group className="form-group">
        <div className="form-label">
          <label>Street Address:</label>
        </div>
        <div className="form-input">
          <span>{account.street_address}</span>
        </div>
      </Form.Group>
      <hr />
      <Form.Group className="form-group">
        <div className="form-label">
          <label>City:</label>
        </div>
        <div className="form-input">
          <span>{account.city}</span>
        </div>
      </Form.Group>
      <hr />
      <Form.Group className="form-group">
        <div className="form-label">
          <label>State:</label>
        </div>
        <div className="form-input">
          <span>{account.state}</span>
        </div>
      </Form.Group>
      <hr />
      <Form.Group className="form-group">
        <div className="form-label">
          <label>Zip Code:</label>
        </div>
        <div className="form-input">
          <span>{account.zipcode}</span>
        </div>
      </Form.Group>
      <hr />
      {account.isGrowr > 0 ? (
        <>
          <Form.Group className="form-group">
            <div className="form-label">
              <label>Hourly Rate:</label>
            </div>
            <div className="form-input">
              <span>{account.hourly_rate}</span>
            </div>
          </Form.Group>
          <hr />
          <Form.Group className="form-group">
            <div className="form-label">
              <label>Maximum Range (miles):</label>
            </div>
            <div className="form-input">
              <span>{account.max_mile_range}</span>
            </div>
          </Form.Group>
          <hr />
        </>
      ) : null}
      <div className="button">
        <button
          onClick={() => changeComponent("UpdateProfile")}
          className="valid-button"
        >
          <span>Edit Profile</span>
        </button>
        <button
          onClick={() => changeComponent("UpdatePassword")}
          className="valid-button"
        >
          <span>Update Password</span>
        </button>
      </div>
    </Form>
  );
}
