import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Styled from "styled-components";

const FormContainer = Styled.div`
  margin: 0 auto;
  align-self: center;
  width: clamp(200px, 50vw, 500px);
  box-shadow: 0px 0px 20px #1ac19788;
  background-image: linear-gradient(to bottom right,#1fdbac, #17a884);
  padding: clamp(1em, 4vw, 4em);
  text-align: left;
  border-radius: 6px;
  h1{
    color: whitesmoke;
    text-align: center;
  }
  .featureless-button {
    border: none;
    background: transparent;
    color: rgba(0, 0, 0, 0.87);
  }
  .featureless-input{
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgb(255, 255, 255);
    outline: none;
    padding: 0% 2%;
    width: 90%;
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
    &:hover{
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

`;
export default function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <FormContainer>
      {isLogin ? <Login /> : <Register />}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="featureless-button clamped-text"
      >
        {isLogin ? "New Around Here?" : "Logging in?"}
      </button>
    </FormContainer>
  );
}
