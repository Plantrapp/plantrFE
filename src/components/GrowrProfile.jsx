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
    border-radius: 10px;
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
  const username = window.document.URL.split("/").pop();
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/info/${username}`)
      .then((res) => {
        setUserInfo(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StyledGrowrProfile>
      <div className="header">
        <div className="left">
          <img src={pic} />
        </div>
        <div className="middle">
          <div>
            {userInfo.first_name} {userInfo.last_name}
          </div>
          <div>{userInfo.role}</div>
          <div>
            {userInfo.city}, {userInfo.state}
          </div>
        </div>
        <div className="middle">
          <div>${userInfo.hourly_rate} per hour</div>
        </div>

        <div className="right">
          STAR
          <br />
          {userInfo.star_rating}
        </div>
      </div>

      <div className="mid">
        <div className="top">
          <h3>Description</h3>
          <div className="content">{userInfo.description}</div>
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
