import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import pic from "../../assets/img/user-profile.png";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import PortfolioItem from "./PortfolioItem";
import BlogItem from "./BlogItem";
import { useHistory } from "react-router-dom";

const StyledUserProfile = Styled.div`
  display: flex;
  flex-direction: column;
  max-width: 85vw;
  min-width: 85vw;
  max-height: 100vh;
  padding: 2%;
  align-items: center;
  color:whitesmoke;
  overflow-y: auto;

  hr{
    background: #292929;
    height: 2px;
    width: 80%;
  }

  /*      heading       */
  .header {
    display: flex;
    width: 60%; 
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .left{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40%;
      img{
        width: 50%;
      }
    }
    .right{
      text-align: left;
      display: flex;
      width: 60%;
      .info{
        width: 65%;
      }
      .rate{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20%;
      }
      .star-rating-container{
        .checked{
          color: yellow;
        }
        .unchecked{
          color: #525151;
        }
      }
    }
    .edit-button-conatiner {
      width: 100%;
      padding: 4%;
      & > button{
        width: 90%;
        background: transparent;
        color: whitesmoke;
        border: 1px solid whitesmoke;
        border-radius: 5px;
        padding: .5%;
        transition: 0.3s ease-in-out;
        &:hover{
          background: #525151;
        }
      }
    }
  }
  /*      portfolio       */
  .switch-button-conatiner{
    width: 60%;

    & > button{
        width: 20%;
        margin:1%;
        background: transparent;
        color: whitesmoke;
        border: 1px solid whitesmoke;
        border-radius: 5px;
        padding: .5%;
        transition: 0.3s ease-in-out;
        &:hover{
          background: #525151;
        }
      }
    }
  }
  .portfolio{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
  }
  .blog{
    width: 80%;
    display: flex;
    flex-direction: column;
  }
`;

export default function UserProfile() {
  const username = localStorage.getItem("username");
  const [userInfo, setUserInfo] = useState({});
  const [starRating, setStarRating] = useState([]);
  const [component, setComponent] = useState("portfolio");
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/info/${username}`)
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

  const changeComponet = (component) => setComponent(component);

  return (
    <StyledUserProfile>
      <div className="header">
        <div className="left">
          <img src={pic} />
        </div>

        <div className="right">
          <div className="info">
            <h1 className="clamped-h1">
              {userInfo.first_name} {userInfo.last_name}
            </h1>
            <div className="star-rating-container">
              {starRating.map((star) => (
                <span>
                  <FaStar className={star ? "checked" : "unchecked"} />
                </span>
              ))}
            </div>
            <div>{userInfo.role}</div>
            <div>
              {userInfo.city}, {userInfo.state}
            </div>
          </div>
          <div className="rate">
            <h2 className="clamped-h2">Rate</h2>
            <p>${userInfo.hourly_rate}</p>
          </div>
        </div>

        <div className="edit-button-conatiner">
          <button onClick={() => history.push("/dashboard/settings")}>
            Edit Profile
          </button>
        </div>
      </div>
      <hr />
      <div className="switch-button-conatiner">
        <button onClick={() => changeComponet("portfolio")}>Portfolio</button>
        <button onClick={() => changeComponet("blog")}>Blog</button>
      </div>
      {(() => {
        switch (component) {
          case "portfolio":
            return (
              <div className="portfolio">
                <PortfolioItem pic={pic} />
                <PortfolioItem pic={pic} />
                <PortfolioItem pic={pic} />
              </div>
            );
          case "blog":
            return (
              <div className="blog">
                <BlogItem />
                <BlogItem />
                <BlogItem />
              </div>
            );
        }
      })()}
    </StyledUserProfile>
  );
}
