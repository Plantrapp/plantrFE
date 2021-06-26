import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { registerFormSchemaPart1 } from "../../validation/formSchema";
// import RegisterGrowr from "./RegisterGrowr";
// import RegisterPlantr from "./RegisterPlantr";
// import { FaAngleLeft } from "react-icons/fa";
import * as yup from "yup";
import geocoder from "react-geocode";
import useTools from "../../utils/useTools";
import Subscribe from "./Subscribe";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";
import { states } from "../../utils/misc";

const initState = {
  username: "",
  profile_picture:
    "https://res.cloudinary.com/samuel-brown/image/upload/c_lpad,h_500,w_500/v1624405583/profile_pics/profile1_yrycyl.png",
  password: "",
  first_name: "",
  last_name: "",
  street_address: "",
  city: "",
  state: "none",
  zipcode: "",
  isGrowr: false,
  hourly_rate: 0,
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

  const { goToPage } = useTools();

  const register = async (e) => {
    e.preventDefault();

    const creds = {
      username: formValues.username.trim().toLowerCase(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      profile_picture: formValues.profile_picture,
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      street_address: formValues.street_address.trim(),
      city: formValues.city.trim(),
      state: formValues.state.trim(),
      zipcode: Number(formValues.zipcode.trim()),
      isGrowr: formValues.isGrowr,
      role: formValues.isGrowr ? "growr" : "dwellr", // just for now until we have a list of roles a GROWR can be.
      hourly_rate: formValues.isGrowr
        ? Number(formValues.hourly_rate).toFixed(2)
        : 0,
      created_at: new Date().toString(),
      isSubscribed: formValues.isGrowr ? false : true,
    };

    await geocoder
      .fromAddress(
        `${creds.street_address}, ${creds.city}, ${creds.state} ${creds.zipcode}`
      )
      .then((res) => {
        creds.lat = res.results[0].geometry.location.lat;
        creds.lng = res.results[0].geometry.location.lng;
      });

    axiosWithAuth()
      .post(`/auth/register`, creds)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", formValues.username);
        sessionStorage.setItem("isGrowr", formValues.isGrowr);
        formValues.isGrowr
          ? sessionStorage.setItem("role", "Growr")
          : sessionStorage.setItem("role", "Dwellr");
        if (formValues.isGrowr) {
          Subscribe(res.data);
        } else {
          goToPage("/dashboard");
        }
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
    <div>
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
      <Form.Group controlId="formBasicEmail">
        <input
          className="featureless-input"
          type="text"
          value={formValues.username}
          onChange={handleOnchange}
          placeholder="Username"
          name="username"
        />
        <p className="error">{formErrors.username}</p>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <input
          className="featureless-input"
          type="password"
          value={formValues.password}
          onChange={handleOnchange}
          placeholder="Password"
          name="password"
        />
        <p className="error">{formErrors.password}</p>
      </Form.Group>
      <Form.Group controlId="">
        <input
          className="featureless-input"
          type="text"
          value={formValues.first_name}
          onChange={handleOnchange}
          placeholder="First Name"
          name="first_name"
        />
        <p className="error">{formErrors.first_name}</p>
      </Form.Group>
      <Form.Group controlId="">
        <input
          className="featureless-input"
          type="text"
          value={formValues.last_name}
          onChange={handleOnchange}
          placeholder="Last Name"
          name="last_name"
        />
        <p className="error">{formErrors.last_name}</p>
      </Form.Group>

      <Form.Group controlId="">
        <input
          className="featureless-input"
          type="text"
          value={formValues.street_address}
          onChange={handleOnchange}
          placeholder="Street Address"
          name="street_address"
        />
        <p className="error">{formErrors.street_address}</p>
      </Form.Group>
      <Form.Group controlId="">
        <input
          className="featureless-input"
          type="text"
          value={formValues.city}
          onChange={handleOnchange}
          placeholder="City"
          name="city"
        />
        <p className="error">{formErrors.city}</p>
      </Form.Group>
      <Form.Group controlId="">
        <select
          className="featureless-input"
          type="text"
          value={formValues.state}
          onChange={handleOnchange}
          placeholder="State"
          name="state"
        >
          <option value="none" selected disabled hidden>
            State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <p className="error">{formErrors.state}</p>
      </Form.Group>
      <Form.Group controlId="">
        <input
          className="featureless-input"
          type="text"
          value={formValues.zipcode}
          onChange={handleOnchange}
          placeholder="Zipcode"
          name="zipcode"
        />
        <p className="error">{formErrors.zipcode}</p>
      </Form.Group>
      <Form.Group controlId="">
        <label className="growr-checkbox">
          <div>Becomeing a Growr?</div>
          <input
            className="featureless-input"
            type="checkbox"
            onClick={() => {
              setFormValues({
                ...formValues,
                isGrowr: !formValues.isGrowr,
                hourly_rate: formValues.isGrowr ? 0 : "",
              });
            }}
            value={formValues.isGrowr}
          />
        </label>
      </Form.Group>
      {formValues.isGrowr ? (
        <>
          <Form.Group controlId="">
            <input
              className="featureless-input"
              type="text"
              value={formValues.hourly_rate}
              onChange={handleOnchange}
              placeholder="Hourly Rate"
              name="hourly_rate"
            />
            <p className="error">{formErrors.hourly_rate}</p>
          </Form.Group>
          <h6
            style={{
              border: "2px solid yellow",
              padding: "2%",
              color: "whitesmoke",
              borderRadius: "3px",
            }}
          >
            **Please note that the Growr account requires a $20 monthly
            subscription to our service in order to utilize the tools provided.
          </h6>
        </>
      ) : null}

      <button
        type="submit"
        onClick={register}
        className={`clamped-text ${
          disabled1 ? "cta-button-disabled" : "cta-button"
        }`}
        disabled={disabled1}
      >
        Subscribe
      </button>
    </div>
  );
}
