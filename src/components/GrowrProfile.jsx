import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Styled from "styled-components";
import axios from "axios";

const StyledGrowrProfile = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 85vw;
  max-height: 90vh;
  padding: 0 2%;
  overflow-y: auto;
  color:whitesmoke;
  .header {
    display: flex;
    height: 15vh;
    .left{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
    }
    .middle{
      display: flex;
      flex-direction: column;
      width: 60%;
      justify-content: space-around;
    }
    .right{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
    }
  }
  .mid {
    height: 65vh;
    .top{
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      test
    }
    .bottom{
      height: 50%;
    }
  }
  .footer {
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
export default function GrowrProfile() {
  return (
    <StyledGrowrProfile>
      <div className="header">
        <div className="left">IMG</div>
        <div className="middle">
          <div>NAME</div>
          <div>ROLE</div>
          <div>LOCATION</div>
        </div>
        <div className="right">rating</div>
      </div>

      <div className="mid">
        <div className="top">
          <div>Description</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ea
            voluptatem, deserunt vel qui beatae mollitia commodi esse quia quam
            velit ducimus. Dolorem quasi eligendi inventore mollitia quas eaque
            rerum.
          </div>
        </div>
        <div className="bottom">PROTFOLIO</div>
      </div>

      <div className="footer">
        <button>CONNECT</button>
      </div>
    </StyledGrowrProfile>
  );
}
