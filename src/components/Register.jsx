import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";

const initState = {
  username: "",
  profile_picture: "",
  password: "",
  first_name: "",
  last_name: "",
  street_address: "",
  city: "",
  state: "",
  zipcode: "",
  isGrowr: false,
};

export default function Register() {
  const [formValue, setFormValue] = useState(initState);
  const history = useHistory();
  const register = (e) => {
    e.preventDefault();

    const creds = {
      username: `${formValue.username}`,
      email: `${formValue.email}`,
      password: `${formValue.password}`,
      first_name: `${formValue.first_name}`,
      last_name: `${formValue.last_name}`,
      street_address: `${formValue.street_address}`,
      city: `${formValue.city}`,
      state: `${formValue.state}`,
      zipcode: `${formValue.zipcode}`,
      isGrowr: `${formValue.isGrowr}`,
    };

    axios
      .post("http://localhost:5000/auth/register", creds)
      .then((res) => {
        console.log(res);
        history.push("/dashboard");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleOnchange = (e) => {
    if (e.target.name === "isGrowr") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.checked,
      });
    } else {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <>
      <Form>
        <h1 className="clamped-h1">Register</h1>
        <Form.Group controlId="formBasicEmail">
          <input
            className="featureless-input"
            type="email"
            onChange={handleOnchange}
            placeholder="Enter email"
            name="email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            placeholder="Username"
            name="username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <input
            className="featureless-input"
            type="password"
            onChange={handleOnchange}
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Form.Group controlId="">
          <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            placeholder="First Name"
            name="first_name"
          />
        </Form.Group>
        <Form.Group controlId="">
          <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            placeholder="Last Name"
            name="last_name"
          />
        </Form.Group>
        <Form.Group controlId="">
          <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            placeholder="Street Address"
            name="street_address"
          />
        </Form.Group>
        <Form.Group controlId="">
          <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            placeholder="City"
            name="city"
          />
        </Form.Group>
        <Form.Group controlId="">
          <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            placeholder="State"
            name="state"
          />
        </Form.Group>
        <Form.Group controlId="">
          <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            placeholder="Zipcode"
            name="zipcode"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Growr?"
            name="isGrowr"
            onChange={handleOnchange}
            style={{ color: "white" }}
            className="clamped-text"
          />
        </Form.Group>

        <button
          type="submit"
          onClick={register}
          className="clamped-text cta-button"
        >
          Register
        </button>
      </Form>
    </>
  );
}
