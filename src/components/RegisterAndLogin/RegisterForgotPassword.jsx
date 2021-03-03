import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { forgotPasswordFormSchema } from "../../validation/formSchema";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { useContext } from "react";
const initState = {
  email: "",
};

export default function RegisterForgotPassword(props) {
  const [formValues, setFormValues] = useState(initState);
  const [formErrors, setFormErrors] = useState(initState);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const { toastOn } = useContext(CurrentUserContext);
  const { setIsForgotPassword, isForgotPassword } = props;

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    yup
      .reach(forgotPasswordFormSchema, name)
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
    forgotPasswordFormSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);
  const send = (e) => {
    e.preventDefault();
    toastOn("forgotPasswordSent");
    setIsForgotPassword(!isForgotPassword);
  };
  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <input
            className="featureless-input"
            type="email"
            value={formValues.email}
            onChange={handleOnchange}
            placeholder="Enter email"
            name="email"
          />
          <p className="error">{formErrors.email}</p>
        </Form.Group>
        <button
          type="submit"
          onClick={send}
          className={`clamped-text ${
            disabled ? "cta-button-disabled" : "cta-button"
          }`}
          disabled={disabled}
        >
          Send Email
        </button>
      </Form>
    </>
  );
}
