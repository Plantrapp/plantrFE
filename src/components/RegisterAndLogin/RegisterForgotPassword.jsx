import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { forgotPasswordFormSchema } from "../../validation/formSchema";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import nodemailer from "nodemailer";
const initState = {
  email: "",
};

export default function RegisterForgotPassword(props) {
  const { setIsForgotPassword, isForgotPassword } = props;
  const [formValues, setFormValues] = useState(initState);
  const [formErrors, setFormErrors] = useState(initState);
  const [disabled, setDisabled] = useState(true);
  const { toastOn } = useContext(CurrentUserContext);
  const sendForgotPasswordEmail = async (e) => {
    e.preventDefault();
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: "'ZaveDev' <zavedev@example.com>",
      to: `${formValues.email}`,
      subject: "TEST TEST TEST",
      html: `
      <h1>Tester Bester</h1>
      <p>This is the best choice.</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
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
