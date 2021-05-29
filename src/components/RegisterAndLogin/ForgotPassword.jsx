import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { forgotPasswordFormSchema } from "../../validation/formSchema";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";
const initState = {
  email: "",
};

export default function ForgotPassword(props) {
  const { setIsForgotPassword, isForgotPassword } = props;
  const [formValues, setFormValues] = useState(initState);
  const [formErrors, setFormErrors] = useState(initState);
  const [disabled, setDisabled] = useState(true);
  const { toastOn } = useContext(CurrentUserContext);

  const sendForgotPasswordEmail = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/forgot/password`, formValues)
      .then((res) => {
        toastOn("forgotPasswordSent");
        setIsForgotPassword(!isForgotPassword);
      })
      .catch((err) => {
        toastOn("forgotPasswordAlreadySent");
      });
  };
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
          onClick={sendForgotPasswordEmail}
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
