import React, { useState } from "react";
import Form from "react-bootstrap/Form";
const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
export default function RegisterPlantr({
  formValues,
  formErrors,
  handleOnchange,
  disabled1,
  register,
}) {
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

      <button
        type="submit"
        onClick={register}
        className={`clamped-text ${
          disabled1 ? "cta-button-disabled" : "cta-button"
        }`}
        disabled={disabled1}
      >
        Register
      </button>
    </div>
  );
}
