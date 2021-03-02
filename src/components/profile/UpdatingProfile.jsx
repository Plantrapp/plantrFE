import React from "react";
import Form from "react-bootstrap/Form";
export default function UpdatingProfile(props) {
  const {
    handleOnchange,
    formValues,
    formErrors,
    handleSubmit,
    disabled,
    FaTimes,
    changeComponent,
  } = props;

  return (
    <>
      <Form>
        <div className="form-heading">
          <h3>Edit Profile</h3>
          <button onClick={() => changeComponent("AccountInfo")}>
            <FaTimes />
          </button>
        </div>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>Email:</label>
          </div>

          <div className="form-input">
            <input
              className="featureless-input"
              type="email"
              onChange={handleOnchange}
              value={formValues.email}
              placeholder="Enter email"
              name="email"
            />
          </div>
        </Form.Group>
        <p>{formErrors.email}</p>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>Username:</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.username}
              placeholder="Username"
              name="username"
            />
          </div>
        </Form.Group>
        <p>{formErrors.username}</p>

        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>First Name:</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.first_name}
              placeholder="First Name"
              name="first_name"
            />
          </div>
        </Form.Group>
        <p>{formErrors.first_name}</p>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>Last Name:</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.last_name}
              placeholder="Last Name"
              name="last_name"
            />
          </div>
        </Form.Group>
        <p>{formErrors.last_name}</p>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>Street Address:</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.street_address}
              placeholder="Street Address"
              name="street_address"
            />
          </div>
        </Form.Group>
        <p>{formErrors.street_address}</p>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>City:</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.city}
              placeholder="City"
              name="city"
            />
          </div>
        </Form.Group>
        <p>{formErrors.city}</p>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>State:</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.state}
              placeholder="State"
              name="state"
            />
          </div>
        </Form.Group>
        <p>{formErrors.state}</p>
        <hr />
        <Form.Group className="form-group">
          <div className="form-label">
            <label>Zip Code:</label>
          </div>
          <div className="form-input">
            <input
              className="featureless-input"
              type="text"
              onChange={handleOnchange}
              value={formValues.zipcode}
              placeholder="Zip Code"
              name="zipcode"
            />
          </div>
        </Form.Group>
        <p>{formErrors.zipcode}</p>
        <hr />
        {formValues.isGrowr > 0 ? (
          <>
            <Form.Group className="form-group">
              <div className="form-label">
                <label>Hourly Rate:</label>
              </div>
              <div className="form-input">
                <input
                  className="featureless-input"
                  type="text"
                  onChange={handleOnchange}
                  value={formValues.hourly_rate}
                  placeholder="Hourly Rate"
                  name="hourly_rate"
                />
              </div>
            </Form.Group>
            <p>{formErrors.hourly_rate}</p>
            <hr />
            <Form.Group className="form-group">
              <div className="form-label">
                <label>Maximum Range (miles):</label>
              </div>
              <div className="form-input">
                <input
                  className="featureless-input"
                  type="text"
                  onChange={handleOnchange}
                  value={formValues.max_mile_range}
                  placeholder="Max Mile Range"
                  name="max_mile_range"
                />
              </div>
            </Form.Group>
            <p>{formErrors.max_mile_range}</p>
            <hr />
          </>
        ) : null}
        <div className="button">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`clamped-text ${
              disabled ? "cta-button-disabled" : "cta-button"
            }`}
            disabled={disabled}
          >
            Update Profile
          </button>
        </div>
      </Form>
    </>
  );
}