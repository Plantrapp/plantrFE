import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
const StyledSideBar = Styled.div`
  background-image: linear-gradient(to bottom right,#1fdbac, #17a884);
  width: 15vw;
  height: 100vh;
  .heading{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
  }
  .menu{
    height:90vh
    display: flex;
    flex-direction: column;
    padding: 10vh 0;
    & button{
      width: 100%;
      text-align: left;
      padding: .75vw;
      margin: 2vh 0;
      background: transparent;
      border: none;
      transition: 0.3s ease-in-out;
      &:hover{
        background: #1fdbac;
      }
    }
  }

`;
export default function SideBar() {
  return (
    <StyledSideBar>
      <div className="clamped-div heading">
        <h3 className="clamped-h3">welcome back user</h3>
      </div>
      <div className="clamped-div menu">
        <button className="clamped-button">Messages</button>
        <button className="clamped-button">Messages</button>
        <button className="clamped-button">Messages</button>
      </div>
    </StyledSideBar>
  );
}
