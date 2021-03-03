import React, { useState } from "react";
import Styled from "styled-components";
import logo from "../assets/img/wlogo1.svg";
import { Login, Register, RegisterForgotPassword } from "../components";

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
export default function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <FormContainer>
      <div className="img-container">
        <img src={logo} alt="" />
      </div>

      {isForgotPassword ? (
        <RegisterForgotPassword
          setIsForgotPassword={setIsForgotPassword}
          isForgotPassword={isForgotPassword}
        />
      ) : isLogin ? (
        <Login />
      ) : (
        <Register />
      )}

      <div className="footer">
        {isForgotPassword ? null : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="featureless-button clamped-text underlined "
          >
            {isLogin ? "New Around Here?" : "Logging in?"}
          </button>
        )}
        {isForgotPassword ? (
          <button
            onClick={() => setIsForgotPassword(!isForgotPassword)}
            className="featureless-button clamped-text underlined "
          >
            Back
          </button>
        ) : isLogin ? (
          <button
            onClick={() => setIsForgotPassword(!isForgotPassword)}
            className="featureless-button clamped-text underlined "
          >
            Forgot Password?
          </button>
        ) : null}
      </div>
    </FormContainer>
  );
}
