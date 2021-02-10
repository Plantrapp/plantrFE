import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";

const initState = {
  username: "",
  password: "",
};

export default function Login() {
  const [formValue, setFormValue] = useState(initState);
  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    const creds = {
      username: `${formValue.username}`,
      password: `${formValue.password}`,
    };

    axios
      .post("http://localhost:5000/auth/login", creds)
      .then((res) => {
        console.log(res);
        localStorage.setItem("username", formValue.username);
        localStorage.setItem("role", res.data.role);
        history.push("/dashboard");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleOnchange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1 className="clamped-h1">Login</h1>
      <Form>
        <Form.Group>
          <input
            type="text"
            placeholder="Username"
            className="featureless-input"
            name="username"
            onChange={handleOnchange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <input
            type="password"
            placeholder="Password"
            className="featureless-input"
            name="password"
            onChange={handleOnchange}
          />
        </Form.Group>
        <button
          type="submit"
          onClick={login}
          className="cta-button clamped-text "
        >
          Login
        </button>
      </Form>
    </>
  );
}
