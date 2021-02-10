import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Styled from "styled-components";
import axios from "axios";
import pic from "../assets/img/user-profile.png";
import { FaStar } from "react-icons/fa";

const StyledGrowrProfile = Styled.div`
  display: flex;
  flex-direction: column;
  max-width: 85vw;
  max-height: 100vh;
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
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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
      border: none;
      color: whitesmoke;
      padding: 0.5%;
      &:hover {
        background: #292929;
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
          {userInfo.star_rating}
          <br />
          <div>
            <span>
              <FaStar />
            </span>
            <span>
              <FaStar />
            </span>
            <span>
              {/* <FaStar />           `      ``wrpgihesortingkhw3lkregfbvlw3i45uket goineartulhy;eoildkg */}
            </span>
            <span>
              <FaStar />
            </span>
            <span>
              <FaStar />
            </span>
          </div>
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
