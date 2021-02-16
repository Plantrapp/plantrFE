import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { registerFormSchemaPart1 } from "../../validation/formSchema";
import RegisterGrowr from "./RegisterGrowr";
import RegisterPlantr from "./RegisterPlantr";
import { FaAngleLeft } from "react-icons/fa";
import * as yup from "yup";
import geocoder from "react-geocode";

const initState = {
  username: "",
  profile_picture: "",
  password: "",
  first_name: "",
  last_name: "",
  street_address: "",
  city: "",
  state: "none",
  zipcode: "",
  isGrowr: null,
  hourly_rate: "",
};
const initError = {
  username: "",
  profile_picture: "",
  password: "",
  first_name: "",
  last_name: "",
  street_address: "",
  city: "",
  state: "",
  zipcode: "",
  isGrowr: "",
  hourly_rate: "",
};
export default function Register() {
  const [formValues, setFormValues] = useState(initState);
  const [formErrors, setFormErrors] = useState(initError);
  const [disabled1, setDisabled1] = useState(true);
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();

    const creds = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      street_address: formValues.street_address.trim(),
      city: formValues.city.trim(),
      state: formValues.state.trim(),
      zipcode: Number(formValues.zipcode.trim()),
      isGrowr: formValues.isGrowr,
      role: "Growr",
      hourly_rate: Number(formValues.hourly_rate).toFixed(2),
    };

    await geocoder
      .fromAddress(
        `${creds.street_address}, ${creds.city}, ${creds.state} ${creds.zipcode}`
      )
      .then((res) => {
        creds.lat = res.results[0].geometry.location.lat;
        creds.lng = res.results[0].geometry.location.lng;
      });
    console.log(creds);

    axios
      .post("http://localhost:5000/auth/register", creds)
      .then((res) => {
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
      .reach(registerFormSchemaPart1, name)
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
    registerFormSchemaPart1.isValid(formValues).then((valid) => {
      setDisabled1(!valid);
    });
  }, [formValues]);

  return (
    <>
      <Form>
        {formValues.isGrowr === null ? (
          <div className="role-selector-conatiner">
            <h2 className="clamped-h2">Select a role</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFormErrors({ ...formErrors, isGrowr: "" });
                setFormValues({
                  ...formValues,
                  hourly_rate: 0,
                  isGrowr: false,
                });
              }}
              className={`clamped-text role-button `}
            >
              Plantr
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFormValues({ ...formValues, isGrowr: true });
                setFormErrors({ ...formErrors, isGrowr: "" });
              }}
              className={`clamped-text role-button `}
            >
              Growr
            </button>
          </div>
        ) : formValues.isGrowr === true ? (
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFormValues(initState);
              }}
              className={`clamped-text cta-button-disabled float-left`}
            >
              <FaAngleLeft />
              Back
            </button>
            <RegisterGrowr
              handleOnchange={handleOnchange}
              formValues={formValues}
              formErrors={formErrors}
              disabled1={disabled1}
              register={register}
            />
          </div>
        ) : (
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFormValues(initState);
              }}
              className={`clamped-text cta-button-disabled float-left`}
            >
              <FaAngleLeft /> Back
            </button>
            <RegisterPlantr
              handleOnchange={handleOnchange}
              formValues={formValues}
              formErrors={formErrors}
              disabled1={disabled1}
              register={register}
            />
          </div>
        )}
      </Form>
    </>
  );
}
