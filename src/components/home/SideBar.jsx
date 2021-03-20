import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Styled from "styled-components";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import logo from "../../assets/img/Asset1.svg";
import {
  FaHome,
  FaEnvelope,
  FaUserCircle,
  FaSignOutAlt,
  FaUsers,
  FaPlus,
} from "react-icons/fa";

const StyledSideBar = Styled.div`
  background-image: linear-gradient(to bottom right,#1fdbac, #17a884);
  width: 15vw;
  height: 100vh;
  color: whitesmoke;
  .heading{
    display: flex;
    align-items: flex-start;
    height: 10vh;
    flex-direction: column;
    .sidebar-logo{
      width:100%;
      display: flex;
      padding-top: 5%;
      padding-left:15%;
      img{
        width: 50%;
      }
    }
  }
  .heading-profile {
    display: flex;
    width: 100%;
    align-items: center;
    margin: 5% 0;
    transition: .3s ease-in-out;
    padding-left: 14%;
    /* &:hover {
      background: #1fdbac;
      cursor: pointer; 
      
    } */
    .profile-image {
      padding: 2% 0;
      width: 20%;
      img {
        border-radius: 100%;
        width: 100%;
      }
    }
    .profile-username {
      padding-left: 5%;
      width: 60%;
      text-align: left;
      display: flex;
      align-items: center;
      & > p {
        margin: 0;

      }
    }
    .profile-icon {
      width: 20%;
      padding-right: 13%;
      
      display: flex;
      align-items: center;
      height: 100%;
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
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <StyledSideBar>
      <div className="heading">
        <div className="sidebar-logo">
          <img src={logo} alt="" className="logo" />
        </div>
        {currentUser && (
          <div className="heading-profile">
            <div className="profile-image">
              <img src={currentUser.profile_picture} />
            </div>
            <div className="profile-username">
              <p>{currentUser.username}</p>
            </div>
          </div>
        )}
      </div>
      <div className="menu">
        <Link to="/dashboard">
          <FaHome />
          <span>Home</span>
        </Link>
        {currentUser && currentUser.isSubscribed > 0 ? (
          <>
            <Link to="/dashboard/connect">
              <FaUsers />
              <span>Connect</span>
            </Link>

            <Link to="/dashboard/messages">
              <FaEnvelope />
              <span>Messages</span>
            </Link>

            <Link to="/dashboard/user-profile">
              <FaUserCircle />
              <span>Profile</span>
            </Link>

            <Link to="/dashboard/blog-post/">
              <FaPlus />
              <span>New Post</span>
            </Link>
            <Link to="/dashboard/portfolio-post/">
              <FaPlus />
              <span>New Portfolio Post</span>
            </Link>
          </>
        ) : null}
      </div>
      <div className="footer">
        <Link
          to="/"
          onClick={() => {
            localStorage.removeItem("username");
            localStorage.removeItem("isGrowr");
          }}
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </Link>
      </div>
    </StyledSideBar>
  );
}
