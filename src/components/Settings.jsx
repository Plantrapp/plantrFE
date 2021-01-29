import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import { FaEdit } from "react-icons/fa";

const StyledSettings = Styled.div`
height: 90vh;
background-color: rgba(255, 255, 255, 0.05);
overflow-y: auto;
color: white;
`;

const initFormValues = {
  username: "",
  email: "",
  profile_picture: "",
  password: "",
  first_name: "",
  last_name: "",
  street_address: "",
  city: "",
  state: "",
  zipcode: "",
};
export default function Settings() {
  const [formValues, setFormValues] = useState(initFormValues);
  const [isEditing, setIsEditing] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/info/${username}`)
      .then((res) => {
        const data = res.data[0];
        data.oldPassword = data.password;
        data.password = "";

        setFormValues(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);
  console.log(formValues);

  const handleOnchange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = formValues.id;
    axios
      .put(`http://localhost:5000/user/${id}`, formValues)
      .then((res) => {
        console.log("Updated", res);
        setIsEditing(!isEditing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isEditing ? (
        <StyledSettings>
          <h3>Edit Profile</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
              Email:
              <input
                className="featureless-input"
                type="email"
                onChange={handleOnchange}
                value={formValues.email}
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              Username:
              <input
                className="featureless-input"
                type="text"
                onChange={handleOnchange}
                value={formValues.username}
                placeholder="Username"
                name="username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              Password:
              <input
                className="featureless-input"
                type="password"
                onChange={handleOnchange}
                value={formValues.password}
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Form.Group controlId="">
              First Name:
              <input
                className="featureless-input"
                type="text"
                onChange={handleOnchange}
                value={formValues.first_name}
                placeholder="First Name"
                name="first_name"
              />
            </Form.Group>
            <Form.Group controlId="">
              Last Name:
              <input
                className="featureless-input"
                type="text"
                onChange={handleOnchange}
                value={formValues.last_name}
                placeholder="Last Name"
                name="last_name"
              />
            </Form.Group>
            <Form.Group controlId="">
              Street Address:
              <input
                className="featureless-input"
                type="text"
                onChange={handleOnchange}
                value={formValues.street_address}
                placeholder="Street Address"
                name="street_address"
              />
            </Form.Group>
            <Form.Group controlId="">
              City:
              <input
                className="featureless-input"
                type="text"
                onChange={handleOnchange}
                value={formValues.city}
                placeholder="City"
                name="city"
              />
            </Form.Group>
            <Form.Group controlId="">
              State:
              <input
                className="featureless-input"
                type="text"
                onChange={handleOnchange}
                value={formValues.state}
                placeholder="State"
                name="state"
              />
            </Form.Group>
            <Form.Group controlId="">
              Zip Code:
              <input
                className="featureless-input"
                type="text"
                onChange={handleOnchange}
                value={formValues.zipcode}
                placeholder="Zip Code"
                name="zipcode"
              />
            </Form.Group>
            {formValues.isGrowr > 0 ? (
              <>
                <Form.Group controlId="">
                  Hourly Rate:
                  <input
                    className="featureless-input"
                    type="text"
                    onChange={handleOnchange}
                    value={formValues.hourly_rate}
                    placeholder="Hourly Rate"
                    name="hourly_rate"
                  />{" "}
                  /hr
                </Form.Group>
                <Form.Group controlId="">
                  Maximum Range (miles):
                  <input
                    className="featureless-input"
                    type="text"
                    onChange={handleOnchange}
                    value={formValues.max_mile_range}
                    placeholder="Max Mile Range"
                    name="max_mile_range"
                  />
                  miles
                </Form.Group>
              </>
            ) : null}

            <button
              type="submit"
              className="clamped-text cta-button"
              onClick={handleSubmit}
            >
              Update Profile
            </button>
          </Form>
        </StyledSettings>
      ) : (
        <StyledSettings>
          <h3>Account Information</h3>
          <Form>
            <Form.Group controlId="formBasicEmail">
              Email:
              <span>{formValues.email}</span>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              Username:
              <span>{formValues.username}</span>
            </Form.Group>

            <Form.Group controlId="">
              First Name:
              <span>{formValues.first_name}</span>
            </Form.Group>
            <Form.Group controlId="">
              Last Name:
              <span>{formValues.last_name}</span>
            </Form.Group>
            <Form.Group controlId="">
              Street Address:
              <span>{formValues.street_address}</span>
            </Form.Group>
            <Form.Group controlId="">
              City:
              <span>{formValues.city}</span>
            </Form.Group>
            <Form.Group controlId="">
              State:
              <span>{formValues.state}</span>
            </Form.Group>
            <Form.Group controlId="">
              Zip Code:
              <span>{formValues.zipcode}</span>
            </Form.Group>
            {formValues.isGrowr > 0 ? (
              <>
                <Form.Group controlId="">
                  Hourly Rate:
                  <span>{formValues.hourly_rate}</span> /hr
                </Form.Group>
                <Form.Group controlId="">
                  Maximum Range (miles):
                  <span>{formValues.max_mile_range}</span>
                  miles
                </Form.Group>
              </>
            ) : null}

            <button
              type="submit"
              className="clamped-text cta-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Profile
              <FaEdit />
            </button>
          </Form>
        </StyledSettings>
      )}
    </>
  );
}
