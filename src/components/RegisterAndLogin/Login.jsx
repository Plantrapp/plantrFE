import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { loginFormSchema } from "../../validation/formSchema";
import { CurrentUserContext } from "../../utils/contexts/Contexts";

const initState = {
  username: "",
  password: "",
};

export default function Login() {
  const [formValues, setFormValues] = useState(initState);
  const [formErrors, setFormErrors] = useState(initState);
  const [disabled, setDisabled] = useState(true);

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    const creds = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };

    axios
      .post("http://localhost:5000/auth/login", creds)
      .then((res) => {
        setCurrentUser(res.data.user);

        localStorage.setItem("username", formValues.username);
        localStorage.setItem("role", res.data.role);
        history.push("/dashboard");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    yup
      .reach(loginFormSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    loginFormSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);
  return (
    <>
      <Form>
        <Form.Group>
          <input
            type="text"
            placeholder="Username"
            className="featureless-input"
            name="username"
            onChange={handleOnchange}
            value={formValues.username}
          />
          <p className="error">
            {formErrors.username === "Username is Required"
              ? formErrors.username
              : null}
          </p>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <input
            type="password"
            placeholder="Password"
            className="featureless-input"
            name="password"
            onChange={handleOnchange}
            value={formValues.password}
          />
          <p className="error">
            {formErrors.password === "Password is Required"
              ? formErrors.password
              : null}
          </p>
        </Form.Group>
        <button
          type="submit"
          onClick={login}
          className={`clamped-text ${
            disabled ? "cta-button-disabled" : "cta-button"
          }`}
          disabled={disabled}
        >
          Login
        </button>
      </Form>
    </>
  );
}
