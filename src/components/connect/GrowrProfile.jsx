import React, { useEffect, useState, useContext } from "react";
import Styled from "styled-components";
import axios from "axios";
import pic from "../../assets/img/user-profile.png";
import { FaStar } from "react-icons/fa";
import { CurrentUserContext } from "../../utils/contexts/Contexts";

const StyledGrowrProfile = Styled.div`
  display: flex;
  flex-direction: column;
  max-width: 85vw;
  min-width: 85vw;
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
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 20%;
      border-radius: 0px 10px 10px 0px;
      .star-rating-container{
        .checked{
          color: yellow;
        }
        .unchecked{
          color: #525151;
        }
      }
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
        overflow-x: auto;
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
        overflow-x: auto;
        white-space: nowrap;
        img{
          display: inline-block;
          margin-right: 5%;
        }
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
  const [starRating, setStarRating] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    axios
      .get(`https://obscure-beyond-36960.herokuapp.com/user/info/${username}`)
      .then((res) => {
        setUserInfo(res.data[0]);
        const starRatingArray = [];
        for (let i = 0; i < 5; i++) {
          starRatingArray.push(i < res.data[0].star_rating);
        }
        setStarRating(starRatingArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const connect = (e) => {
    e.preventDefault();

    const dwellr_id = currentUser.id;
    const growr_id = userInfo.id;

    console.log(dwellr_id, growr_id);
    axios
      .post(
        "https://obscure-beyond-36960.herokuapp.com/client-growr-connection",
        {
          dwellr_id,
          growr_id,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
          Rating
          <br />
          <div className="star-rating-container">
            {starRating.map((star) => (
              <span>
                <FaStar className={star ? "checked" : "unchecked"} />
              </span>
            ))}
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
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
            <img src={pic} />
          </div>
        </div>
      </div>

      <div className="footer">
        <button onClick={connect}>Message</button>
      </div>
    </StyledGrowrProfile>
  );
}
