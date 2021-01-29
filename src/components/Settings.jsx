import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import { FaEdit } from "react-icons/fa";

const StyledSettings = Styled.div`
/* height: 90vh; */
background-color: rgba(255, 255, 255, 0.05);
overflow-y: auto;
color: white;
text-align: left;
width: 60%;
margin: 0 auto;
border-radius: 10px;
padding: 0 4%;

h3 {
  text-align: center;
  padding-top: 3%;
}
hr {
  background-color: white;
}
input {
  width: 100%;
}
input::placeholder {
  color: #9b9b9b;
}
.form-group {
  display: flex;
  align-items: center;
  .form-label {
    width: 40%;
    padding-left: 2%;
    font-weight: bold;
  }
  .form-input {
    width: 60%;
  }
}
label {
  margin: 0;
}
.button {
  text-align: center;
  margin: 1% 0 3% 0;
 
}
`

const initFormValues = {
  username: "",
  email: "",
  profile_picture: "",
  password: "",
  first_name: "",
  last_name: "",
  street_address: "",
  city: "",
  state: "",
  zipcode: "",
};
export default function Settings() {
  const [formValues, setFormValues] = useState(initFormValues);
  const [isEditing, setIsEditing] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/info/${username}`)
      .then((res) => {
        const data = res.data[0];
        data.oldPassword = data.password;
        data.password = "";

        setFormValues(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);
  console.log(formValues);

  const handleOnchange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = formValues.id;
    axios
      .put(`http://localhost:5000/user/${id}`, formValues)
      .then((res) => {
        console.log("Updated", res);
        setIsEditing(!isEditing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    return (
      <>
      {isEditing ? (<StyledSettings>
            <h3>Edit Profile</h3>
            <hr/>
            <Form>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          Email:
            </label></div>

          <div className="form-input">
            <input
            className="featureless-input"
            type="email"
            onChange={handleOnchange}
            value={formValues.email}
            placeholder="Enter email"
            name="email"
            />
            </div>
        </Form.Group>
            <hr/>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          Username:
            </label></div>
          <div className="form-input">
            <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            value={formValues.username}
            placeholder="Username"
            name="username"
            />
            </div>
        </Form.Group>
            <hr/>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          Password:
            </label></div>
          <div className="form-input">
            <input
            className="featureless-input"
            type="password"
            onChange={handleOnchange}
            value={formValues.password}
            placeholder="Password"
            name="password"
            />
            </div>
        </Form.Group>
            <hr/>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          First Name:
            </label></div>
          <div className="form-input">
            <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            value={formValues.first_name}
            placeholder="First Name"
            name="first_name"
            />
            </div>
        </Form.Group>
            <hr/>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          Last Name:
            </label></div>
          <div className="form-input">
            <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            value={formValues.last_name}
            placeholder="Last Name"
            name="last_name"
            />
            </div>
        </Form.Group>
            <hr/>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          Street Address:
            </label></div>
          <div className="form-input">
            <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            value={formValues.street_address}
            placeholder="Street Address"
            name="street_address"
            />
            </div>
        </Form.Group>
            <hr/>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          City:
            </label></div>
          <div className="form-input">
            <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            value={formValues.city}
            placeholder="City"
            name="city"
            />
            </div>
        </Form.Group>
            <hr/>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          State:
            </label></div>
          <div className="form-input">
            <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            value={formValues.state}
            placeholder="State"
            name="state"
            />
            </div>
        </Form.Group>
            <hr/>
        <Form.Group className="form-group">
          <div className="form-label"><label>
          Zip Code:
            </label></div>
          <div className="form-input">
            <input
            className="featureless-input"
            type="text"
            onChange={handleOnchange}
            value={formValues.zipcode}
            placeholder="Zip Code"
            name="zipcode"
            />
            </div>
        </Form.Group>
            <hr/>
        {formValues.isGrowr > 0 ? 
        (
        <>
					<Form.Group className="form-group">
            <div className="form-label"><label>
            Hourly Rate:
              </label></div>
						<div className="form-input">
              <input
						className="featureless-input"
						type="text"
						onChange={handleOnchange}
						value={formValues.hourly_rate}
						placeholder="Hourly Rate"
						name="hourly_rate"
						/> 
            </div>
					</Form.Group>
            <hr/>
					<Form.Group className="form-group">
            <div className="form-label"><label>
            Maximum Range (miles):
              </label></div>
						<div className="form-input">
              <input
							className="featureless-input"
							type="text"
							onChange={handleOnchange}
							value={formValues.max_mile_range}
							placeholder="Max Mile Range"
							name="max_mile_range"
              />
              </div>
					</Form.Group>
              <hr/>
        </>
    		)    
    		:null}
        <div className="button">

          <button
            type="submit"
            className="clamped-text"
            onClick={handleSubmit}
            >
            Update Profile
          </button>
        </div>
      </Form>
            
    </StyledSettings>
    ) 
    : 
    (
    <StyledSettings>
            <h3>Account Information</h3>
            <hr/>
            <Form>
        <Form.Group className="form-group">
          <div className="form-label">
            <label>
              Email:
              </label>
            </div>
            <div className="form-input">

          <span>{formValues.email}</span>
            </div>
        </Form.Group>
        <hr/>

        <Form.Group className="form-group">
          <div className="form-label">
            <label>
              Username:
              </label>
            </div>
            <div className="form-input">

          <span>{formValues.username}</span>
            </div>
        </Form.Group>
        <hr/>
       
        <Form.Group className="form-group">
          <div className="form-label">
            <label>
              First Name:
              </label>
            </div>
            <div className="form-input">

          <span>{formValues.first_name}</span>
            </div>
        </Form.Group>
        <hr/>
        <Form.Group className="form-group">
          <div className="form-label">
            <label>
              Last Name:
              </label>
            </div>
            <div className="form-input">

          <span>{formValues.last_name}</span>
            </div>
        </Form.Group>
        <hr/>
        <Form.Group className="form-group">
          <div className="form-label">
            <label>
              Street Address:
              </label>
            </div>
            <div className="form-input">

          <span>{formValues.street_address}</span>
            </div>
        </Form.Group>
        <hr/>
        <Form.Group className="form-group">
          <div className="form-label">
            <label>
              City:
              </label>
            </div>
            <div className="form-input">

          <span>{formValues.city}</span>
            </div>
        </Form.Group>
        <hr/>
        <Form.Group className="form-group">
          <div className="form-label">
            <label>
              State:
              </label>
            </div>
            <div className="form-input">

          <span>{formValues.state}</span>
            </div>
        </Form.Group>
        <hr/>
        <Form.Group className="form-group">
          <div className="form-label">
            <label>
              Zip Code:
              </label>
            </div>
            <div className="form-input">

          <span>{formValues.zipcode}</span>
            </div>
        </Form.Group>
        <hr/>
        {formValues.isGrowr > 0 ? 
        (
        <>
					<Form.Group className="form-group">
            <div className="form-label">
              <label>
                Hourly Rate:
                </label>
              </div>
              <div className="form-input">

						<span>{formValues.hourly_rate}</span> 
              </div>
					</Form.Group>
          <hr/>
					<Form.Group className="form-group">
            <div className="form-label">
              <label>
                Maximum Range (miles):
                </label>
              </div>
              <div className="form-input">

						<span>{formValues.max_mile_range}</span>
              </div>
					 
					</Form.Group>
          <hr/>
        </>
    		)    
    		:null}
        <div className="button">

        <button
          type="submit"
          className="clamped-text"
          onClick={() => setIsEditing(!isEditing)}
          >
          Edit Profile
          <FaEdit/>
        </button>
          </div>
      </Form>
            
    </StyledSettings>)}
      </>

            
  );
}
