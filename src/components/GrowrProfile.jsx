import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Styled from "styled-components";
import axios from "axios";
import pic from "../assets/img/user-profile.png";

const StyledGrowrProfile = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 85vw;
  max-height: 85vh;
  padding: 2%;

  color:whitesmoke;
  .header {
    display: flex;
    height: 15vh;
    padding: 1%;
    
    .left{
      background: #292929;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      border-radius: 10px 0px 0px 10px;
      img{
        width: 50%;
      }
    }
    .middle{
      text-align: left;
      background: #292929;
      display: flex;
      flex-direction: column;
      width: 30%;
      justify-content: space-around;
    }
    .right{
      background: #292929;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
      border-radius: 0px 10px 10px 0px;
    }
  }
  .mid {
    padding: 2%;
    height: 65vh;
    .top{
      height: 45%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      text-align: left;
      background: #292929;
      border-radius: 10px;
      padding: 2%;
      .content{
        height: 80%;
        width: 100%;
      }
    }
    .bottom{
      margin: 2% 0% 0% 0%;
      height: 45%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      text-align: left;
      background: #292929;
      border-radius: 10px;
      padding: 2%;
      .content{
        height: 80%;
        width: 100%;
        display: flex;

      }
    }
  }
  .footer {
    background: #292929;
    padding: 2%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button{
      background: transparent;
      border-radius: 4px;
      transition: 0.3s ease-in-out;
      border: 1px solid #17a884;
      color: #17a884;
      &:hover{
        color: whitesmoke;
        background: #17a884;
      }
    }
  }
`;
export default function GrowrProfile() {
  return (
    <StyledGrowrProfile>
      <div className="header">
        <div className="left">
          <img src={pic} />
        </div>
        <div className="middle">
          <div>NAME</div>
          <div>ROLE</div>
          <div>LOCATION</div>
        </div>
        <div className="middle">
          <div>$ per hour</div>
        </div>

        <div className="right">
          STAR
          <br />
          rating
        </div>
      </div>

      <div className="mid">
        <div className="top">
          <h3>Description</h3>
          <div className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ea
            voluptatem, deserunt vel qui beatae mollitia commodi esse quia quam
            velit ducimus. Dolorem quasi eligendi inventore mollitia quas eaque
            rerum.
          </div>
        </div>
        <div className="bottom">
          <h3>Portfolio</h3>
          <div className="content">
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
          </div>
        </div>
      </div>

      <div className="footer">
        <button>Message</button>
      </div>
    </StyledGrowrProfile>
  );
}
