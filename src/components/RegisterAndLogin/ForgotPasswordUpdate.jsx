import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import Styled from "styled-components";
import { forgotPasswordSchema } from "../../validation/formSchema";
import useTools from "../../utils/useTools";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

const FormContainer = Styled.div`
  margin: 0 auto;
  align-self: center;
  width: clamp(200px, 50vw, 500px);
  box-shadow: 0px 0px 20px #1ac19788;
  background-image: linear-gradient(to bottom right,#1fdbac, #17a884);
  padding: clamp(1em, 4vw, 4em);
  text-align: left;
  border-radius: 6px;
  .float-left{
    float: left;
  }
  .underlined{
    text-decoration: underline;
    color: #e4e4e4;
    width: 100%;
  }
  .error{
    color: red;
  }
  .img-container{
    display: flex;
    justify-content: center;
    img{
      width: 12%;
    }
  }
  h1{
    color: whitesmoke;
    text-align: center;
  }
  }
  h2{
    color: whitesmoke;
    text-align: center;
    width: 100%;
  }
  h4{
    color: whitesmoke;
  }
  .featureless-button {
    border: none;
    background: transparent;
  }
  .featureless-input{
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgb(255, 255, 255);
    outline: none;
    padding: 0% 2%;
    width: 100%;
    color: rgb(255, 255, 255);
    margin: 2% 0;
  }
  .featureless-input:focus{
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px solid rgb(255, 255, 255);
    border-radius: 0;
    outline-style: none;
    text-decoration: none;
    color: rgb(255, 255, 255);


  }
  .cta-button{
    background-color: rgba(1, 240, 160,0);
    border-radius: 3px;
    color:whitesmoke;
    border: 1px solid whitesmoke;
    transition: 0.3s ease-in-out;
    display: flex;
    align-items: center;
    margin: 0 auto;
    &:hover{
      background-color: rgba(73, 206, 195, 0.2);
      cursor: pointer;
    }
  }
  .cta-button-disabled {
    transition: 0.3s ease-in-out;
    border: none;
    color:whitesmoke;
    background: none;
    display: flex;
    align-items: center;
    margin: 0 auto;
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .role-selector-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 50%;
    .role-button{
      background-color: rgba(1, 240, 160,0);
      border-radius: 3px;
      color:whitesmoke;
      border: 1px solid rgba(0, 0, 0,0);
      border-bottom: 1px solid rgba(255, 255, 255,0.5);
      width: 25%;
      height: 100%;
      transition: 0.3s ease-in-out;
      &:hover{
        border: 1px solid whitesmoke;
        background-color: rgba(73, 206, 195, 0.2);
      }
    }
  }
  .footer{
    display: flex;
  }
`;

const initialState = {
  password: "",
  confirmPassword: "",
};

export default function ForgotPasswordUpdate() {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const [disabled, setDisabled] = useState(false);
  const [id, setId] = useState();
  const [hashObject, setHashObject] = useState();
  const [status, setStatus] = useState();
  const { toastOn } = useContext(CurrentUserContext);
  const { goToPage } = useTools();
  const hash = window.location.pathname.replace("/forgot-password/", "");

  useEffect(() => {
    axiosWithAuth()
      .get(`/forgot/password/${hash}`)
      .then((res) => {
        const response = res.data[0];
        setHashObject(response);

        if (Date.now() > response.expires) {
          return setStatus("expired");
        } else if (response.isHashUsed) {
          return setStatus("used");
        } else {
          setStatus("ready");
          setId(response.user_id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    yup
      .reach(forgotPasswordSchema, name)
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
    axiosWithAuth()
      .put(`/user/${id}`, {
        password: formValues.password,
        key: true,
      })
      .then((res) => {
        axiosWithAuth()
          .put(`/forgot/password`, {
            id: hashObject.id,
            isHashUsed: true,
          })
          .then((res) => console.log("Email sent"))
          .catch((err) => console.log(err));
        goToPage("/Dashboard");
        toastOn("successfulUpdatePassword");
      })
      .catch((err) => {
        console.log(err);
        toastOn("invalidUpdatePassword");
      });
  };
  useEffect(() => {
    forgotPasswordSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
      if (valid) {
        setFormErrors({
          password: "",
          confirmPassword: "",
        });
      }
    });
  }, [formValues]);

  return (
    <FormContainer>
      {(() => {
        switch (status) {
          case "expired":
            return (
              <>
                <h2>Reset password link has expired</h2>
                <button
                  onClick={() => goToPage("/")}
                  className={`clamped-text cta-button`}
                >
                  Back
                </button>
              </>
            );

          case "used":
            return (
              <>
                <h2>Reset password link has already been used</h2>
                <button
                  onClick={() => goToPage("/")}
                  className={`clamped-text cta-button`}
                >
                  Back
                </button>
              </>
            );

          case "ready":
            return (
              <Form>
                <div className="form-heading">
                  <h2>Reset Password</h2>
                </div>
                <Form.Group>
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

                <Form.Group controlId="formBasicPassword">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="featureless-input"
                    name="confirmPassword"
                    onChange={handleOnchange}
                    value={formValues.confirmPassword}
                  />
                  <p className="error">{formErrors.confirmPassword}</p>
                </Form.Group>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`clamped-text ${
                    disabled ? "cta-button-disabled" : "cta-button"
                  }`}
                  disabled={disabled}
                >
                  Update
                </button>
              </Form>
            );
          default:
            return null;
        }
      })()}
    </FormContainer>
  );
}
