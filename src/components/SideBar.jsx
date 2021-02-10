import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import { FaHome, FaEnvelope, FaCog, FaMap, FaSignOutAlt } from "react-icons/fa";

import logo from "../assets/img/Asset1.svg";

const StyledSideBar = Styled.div`
  background-image: linear-gradient(to bottom right,#1fdbac, #17a884);
  width: 15vw;
  height: 100vh;
  color: whitesmoke;
  .heading{
    display: flex;
    padding-left: 15%;
    align-items: center;
    height: 10vh;
    img{
      width: 50%;
    }
  }
  .menu{
    height:80vh;
    display: flex;
    flex-direction: column;
    padding: 10vh 0;
    & a{
      width: 100%;
      text-align: left;
      padding: .75vw 2vw;
      margin: 2vh 0;
      background: transparent;
      transition: 0.3s ease-in-out;
      text-decoration: none;
      display: flex;
      align-items: center;
      color: whitesmoke;
      span{
        margin-left: 5%;
        }
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
    & a{
      width: 100%;
      text-align: left;
      padding: .75vw 2vw;
      margin: 2vh 0;
      background: transparent;
      border: none;
      transition: 0.3s ease-in-out;
      text-decoration: none;
      display: flex;
      align-items: center;
      color: whitesmoke;
      span{
        margin-left: 5%;
        }
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
        <img src={logo} alt="" />
      </div>
      <div className="menu">
        <Link to="/dashboard">
          <FaHome />
          <span>Home</span>
        </Link>

        <Link to="/dashboard/messages">
          <FaEnvelope />
          <span>Messages</span>
        </Link>

        <Link to="/dashboard/map">
          <FaMap />
          <span>Map</span>
        </Link>

        <Link to="/dashboard/settings">
          <FaCog />
          <span>Settings</span>
        </Link>
      </div>
      <div className="footer">
        <Link to="/">
          <FaSignOutAlt />
          <span>Sign Out</span>
        </Link>
      </div>
    </StyledSideBar>
  );
}
