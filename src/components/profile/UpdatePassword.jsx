import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import * as yup from "yup";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { updatePasswordSchema } from "../../validation/formSchema";
import { baseURL } from "../../utils/misc";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

const initialState = {
  previous_password: "",
  password: "",
};

export default function UpdatePassword(props) {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const [disabled, setDisabled] = useState(false);
  const { changeComponent, id, FaTimes } = props;
  const { currentUser, toastOn } = useContext(CurrentUserContext);
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    yup
      .reach(updatePasswordSchema, name)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldPassword = currentUser.password;

    axiosWithAuth()
      .put(`/user/${id}`, {
        previous_password: formValues.previous_password,
        password: formValues.password,
        oldPassword,
      })
      .then((res) => {
        changeComponent("AccountInfo");
        toastOn("successfulUpdatePassword");
      })
      .catch((err) => {
        console.log(err);
        toastOn("invalidUpdatePassword");
      });
  };

  useEffect(() => {
    updatePasswordSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);
  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-heading">
        <h3>Update password</h3>
        <button onClick={() => changeComponent("AccountInfo")}>
          <FaTimes />
        </button>
      </div>

      <hr />

      <Form.Group className="form-group">
        <div className="form-label">
          <label>Previous Password:</label>
        </div>

        <div className="form-input">
          <input
            className="featureless-input"
            type="password"
            onChange={handleOnchange}
            value={formValues.previous_password}
            name="previous_password"
          />
        </div>
      </Form.Group>

      <p className="error">{formErrors.previous_password}</p>

      <hr />

      <Form.Group className="form-group">
        <div className="form-label">
          <label>New Password:</label>
        </div>

        <div className="form-input">
          <input
            className="featureless-input"
            type="password"
            onChange={handleOnchange}
            value={formValues.password}
            name="password"
          />
        </div>
      </Form.Group>

      <p className="error">{formErrors.password}</p>

      <div className="button">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`clamped-text ${
            disabled ? "disabled-button" : "valid-button"
          }`}
          disabled={disabled}
        >
          Update password
        </button>
      </div>
    </Form>
  );
}
