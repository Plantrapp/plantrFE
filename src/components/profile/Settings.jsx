import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import geocoder from "react-geocode";
import * as yup from "yup";
import UpdatingProfile from "./UpdatingProfile";
import AccountInfo from "./AccountInfo";
import UpdatePassword from "./UpdatePassword";
import { FaEdit, FaTimes } from "react-icons/fa";
import { updateProfileSchema } from "../../validation/formSchema";
import { useCurrentUserContext } from "../../utils/contexts/Contexts";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

const StyledSettings = Styled.div`
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.05);
  overflow-y: auto;
  color: white;
  text-align: left;
  width: 60%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 0 4%;
  width: 85vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    text-align: center;
    margin-bottom: 0;
  }
  p{
    text-align: center;
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
  .form-heading{
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
      background: none;
      border: none;
      transition: 0.3s ease-in-out;
      color: whitesmoke;
      &:hover{
        background: #292929;
        cursor: pointer;
      }
    }
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

    display: flex;
    justify-content: center;
    width: 100%;
    .disabled-button{
      width: 20%;
      margin:1%;
      background: transparent;
      color: whitesmoke;
      border: 1px solid rgba(255, 255, 255, 0);
      border-radius: 5px;
      padding: .5%;
      transition: 0.3s ease-in-out;
     }
    .valid-button{
      width: 20%;
      margin:1%;
      background: transparent;
      color: whitesmoke;
      border: 1px solid whitesmoke;
      border-radius: 5px;
      padding: .5%;
      transition: 0.3s ease-in-out;
      border: 1px solid whitesmoke;
      &:hover{
        background: #525151;
      }
    }
  }
  .error{
    color: red;
  }
`;

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
  const [account, setAccount] = useState(formValues);
  const [formErrors, setFormErrors] = useState(initFormValues);
  const [disabled, setDisabled] = useState(true);
  const [component, setComponent] = useState("AccountInfo");
  const [selectedImage, setSelectedImage] = useState("");
  const { currentUser, setCurrentUser, toastOn } = useCurrentUserContext();

  const changeComponent = (component) => setComponent(component);

  useEffect(() => {
    if (currentUser) {
      const data = { ...currentUser };
      setFormValues(data);
      setAccount(data);
    }
  }, [currentUser]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    yup
      .reach(updateProfileSchema, name)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = formValues.id;
    if (
      formValues.street_address !== currentUser.street_address ||
      formValues.city !== currentUser.city ||
      formValues.state !== currentUser.state ||
      formValues.zipcode !== currentUser.zipcode
    ) {
      await geocoder
        .fromAddress(
          `${formValues.street_address}, ${formValues.city}, ${formValues.state} ${formValues.zipcode}`
        )
        .then((res) => {
          formValues.lat = res.results[0].geometry.location.lat;
          formValues.lng = res.results[0].geometry.location.lng;
        });
    }
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      for (let key in formValues) {
        formData.append(key, formValues[key]);
      }

      axiosWithAuth()
        .put(`/user/${id}`, formData)
        .then((res) => {
          setCurrentUser((oldUser) => {
            return { ...oldUser, ...res.data };
          });
          sessionStorage.setItem("username", res.data.username);
          changeComponent("AccountInfo");
          toastOn("successfulProfileUpdate");
          setAccount(formValues);
        })
        .catch((err) => {
          console.log("error", err);
          // alert("Username already in use");
        });
    } else {
      axiosWithAuth()
        .put(`/user/${id}`, formValues)
        .then((res) => {
          changeComponent("AccountInfo");
          setCurrentUser(res.data);
          sessionStorage.setItem("username", res.data.username);
          toastOn("successfulProfileUpdate");
          setAccount(formValues);
        })
        .catch((err) => {
          console.log("error", err);
          // alert("Username already in use");
        });
    }
  };

  useEffect(() => {
    updateProfileSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <>
      {(() => {
        switch (component) {
          case "AccountInfo":
            return (
              <StyledSettings>
                <AccountInfo
                  Form={Form}
                  account={account}
                  FaEdit={FaEdit}
                  changeComponent={changeComponent}
                  FaTimes={FaTimes}
                />
              </StyledSettings>
            );
          case "UpdateProfile":
            return (
              <StyledSettings>
                <UpdatingProfile
                  handleOnchange={handleOnchange}
                  formValues={formValues}
                  formErrors={formErrors}
                  handleSubmit={handleSubmit}
                  disabled={disabled}
                  changeComponent={changeComponent}
                  FaTimes={FaTimes}
                  setSelectedImage={setSelectedImage}
                />
              </StyledSettings>
            );
          case "UpdatePassword":
            return (
              <StyledSettings>
                <UpdatePassword
                  changeComponent={changeComponent}
                  id={formValues.id}
                  FaTimes={FaTimes}
                />
              </StyledSettings>
            );
          default:
            return null;
        }
      })()}
    </>
  );
}
