import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import boxArrowRight from "../../node_modules/bootstrap-icons/icons/box-arrow-right.svg";
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
    height:80vh;
    display: flex;
    flex-direction: column;
    padding: 10vh 0;
    & button{
      width: 100%;
      text-align: left;
      padding: .75vw 2vw;
      margin: 2vh 0;
      background: transparent;
      border: none;
      transition: 0.3s ease-in-out;
      &:hover{
        background: #1fdbac;
      }
    }
  }
  .footer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    & button{
      width: 100%;
      text-align: left;
      padding: .75vw 2vw;
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
      <div className="heading">
        <h3 className="clamped-h3">welcome back user</h3>
      </div>
      <div className="menu">
        <button className="clamped-button">Messages</button>
        <Link to="/dashboard/settings"><button className="clamped-button">Settings</button></Link>
      </div>
      <div className="footer">
        <button className="clamped-button">
          Sign Out <img src={boxArrowRight} alt="" />
        </button>
      </div>
    </StyledSideBar>
  );
}
