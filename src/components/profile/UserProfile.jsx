import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import pic from "../../assets/img/user-profile.png";
import axios from "axios";
import PortfolioItem from "./PortfolioItem";
import BlogItem from "./BlogItem";
import Modaler from "../../utils/modal/Modaler";
import useTools from "../../utils/useTools";
import { FaStar } from "react-icons/fa";
import { CurrentUserContext } from "../../utils/contexts/Contexts";

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
    .edit-button-container {
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
      .mint{
        border: 1px solid #1fdbac;    
        color: #1fdbac;
      }
    }
  }
  /*      portfolio       */
  .switch-button-container{
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
    padding: 5%;
  }
  .blog{
    width: 80%;
    display: flex;
    flex-direction: column;
  }

`;

export default function UserProfile() {
  const { goToPage, getHistoryState, getStars } = useTools();
  const username = localStorage.getItem("username");
  const [userInfo, setUserInfo] = useState({});
  const [starRating, setStarRating] = useState([]);
  const [component, setComponent] = useState("portfolio");
  const [postedBlogs, setPostedBlogs] = useState(null);
  const [growr, setGrowr] = useState(getHistoryState());
  const { currentUser } = useContext(CurrentUserContext);
  const [isConnected, setIsConnected] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [portfolioPosts, setPortfolioPosts] = useState([]);
  const [modalInfo, setModalInfo] = useState({});
  const [showEditInput, setShowEditInput] = useState(false);

  useEffect(() => {
    if (growr) {
      const { username, id } = growr.growr;
      axios
        .get(`https://obscure-beyond-36960.herokuapp.com/user/info/${username}`)
        .then((res) => {
          setUserInfo(res.data[0]);
          const starRatingArray = [];
          for (let i = 0; i < 5; i++) {
            starRatingArray.push(i < res.data[0].star_rating);
          }
          setStarRating(starRatingArray);
          fetchBlogPosts(res.data[0].id);
          fetchPortfolioPosts(res.data[0].id);
        })
        .catch((err) => {
          console.log(err);
        });
      currentUser &&
        axios
          .get(
            `https://obscure-beyond-36960.herokuapp.com/client-growr-connection/dwellr/${currentUser.id}`
          )
          .then((res) => {
            res.data.forEach((user) => {
              console.log(user);
              if (user.id === id) return setIsConnected(true);
            });
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
      axios
        .get(`https://obscure-beyond-36960.herokuapp.com/user/info/${username}`)
        .then((res) => {
          setUserInfo(res.data[0]);
          const starRatingArray = [];
          for (let i = 0; i < 5; i++) {
            starRatingArray.push(i < res.data[0].star_rating);
          }
          setStarRating(starRatingArray);
          fetchBlogPosts(res.data[0].id);
          fetchPortfolioPosts(res.data[0].id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [growr, currentUser]);

  const fetchBlogPosts = (author_id) => {
    axios
      .get(
        `https://obscure-beyond-36960.herokuapp.com/blog-posts/user/${author_id}`
      )
      .then((res) => {
        setPostedBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPortfolioPosts = (user_id) => {
    axios
      .get(
        `https://obscure-beyond-36960.herokuapp.com/portfolio-posts/user/${user_id}`
      )
      .then((res) => {
        setPortfolioPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeComponent = (component) => setComponent(component);

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
      .then((res) => setIsConnected(true))
      .catch((err) => console.log(err));
  };
  const disconnect = (e) => {
    e.preventDefault();

    const dwellr_id = currentUser.id;
    const growr_id = userInfo.id;

    console.log(dwellr_id, growr_id);
    axios
      .delete(
        "https://obscure-beyond-36960.herokuapp.com/client-growr-connection",
        {
          data: {
            dwellr_id,
            growr_id,
          },
        }
      )
      .then((res) => setIsConnected(false))
      .catch((err) => console.log(err));
  };

  const goToSettings = () => goToPage("/dashboard/settings");
  const goToRating = () => goToPage("/dashboard/rating", growr);

  const handleDelete = () => {
    axios
      .delete(
        `https://obscure-beyond-36960.herokuapp.com/portfolio-posts/${modalInfo.id}`
      )
      .then((res) => {
        setPortfolioPosts((oldPosts) =>
          oldPosts.filter((oldPost) => oldPost.id !== modalInfo.id)
        );
        setModalShow(false);
        setModalInfo({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(modalInfo);
    axios
      .put(
        `https://obscure-beyond-36960.herokuapp.com/portfolio-posts/${modalInfo.id}`,
        {
          description: modalInfo.description,
        }
      )
      .then((res) => {
        console.log(res);
        setShowEditInput(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StyledUserProfile>
      <Modaler
        show={modalShow}
        onHide={() => setModalShow(false)}
        info={modalInfo}
      >
        {showEditInput ? (
          <form>
            <input
              value={modalInfo.description}
              onChange={(e) =>
                setModalInfo((oldInfo) => {
                  return { ...oldInfo, description: e.target.value };
                })
              }
            />
            <button type="submit" onClick={handleEdit}>
              Done
            </button>
          </form>
        ) : (
          <div
            className="postButtons"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <button onClick={handleDelete}>Delete Post</button>
            <button onClick={setShowEditInput}>Edit Description</button>
          </div>
        )}
      </Modaler>
      <div className="header">
        <div className="left">
          <img src={userInfo.profile_picture} />
          {/* <Hover>{(hovering) => <ProfilePicture hovering={hovering} />}</Hover> Experimental feature 💡 Hover for profile pictures */}
        </div>

        <div className="right">
          <div className="info">
            <h1 className="clamped-h1">
              {userInfo.first_name} {userInfo.last_name}
            </h1>
            <div className="star-rating-container">
              {userInfo.isGrowr === 1 &&
                starRating.map((star) => (
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
          {userInfo.isGrowr === 1 && (
            <div className="rate">
              <h2 className="clamped-h2">Rate</h2>
              <p>${userInfo.hourly_rate}</p>
            </div>
          )}
        </div>
        {!growr ? (
          <div className="edit-button-container">
            <button onClick={goToSettings}>Edit Profile</button>
          </div>
        ) : isConnected ? (
          <div className="edit-button-container ">
            <button className="mint" onClick={disconnect}>
              Connected
            </button>
            <button style={{ marginTop: "2%" }} onClick={goToRating}>
              Leave a review
            </button>
          </div>
        ) : (
          <div className="edit-button-container">
            <button onClick={connect}>Connect</button>
          </div>
        )}
      </div>
      <hr />
      {userInfo.isGrowr === 1 && (
        <div className="switch-button-container">
          <button onClick={() => changeComponent("portfolio")}>
            Portfolio
          </button>
          <button onClick={() => changeComponent("blog")}>Blog</button>
        </div>
      )}

      {(() => {
        switch (component) {
          case "portfolio":
            return (
              <div className="portfolio">
                {portfolioPosts.map((item) => (
                  <PortfolioItem
                    item={item}
                    show={() => {
                      setModalShow(true);
                    }}
                    setModalInfo={setModalInfo}
                    // setModalDesc={setModalDesc}
                  />
                ))}
              </div>
            );
          case "blog":
            return (
              <div className="blog">
                {postedBlogs &&
                  postedBlogs.map((blog) => (
                    <BlogItem
                      blog={blog}
                      fetchBlogPosts={fetchBlogPosts}
                      currentUser={currentUser}
                    />
                  ))}
              </div>
            );
        }
      })()}
    </StyledUserProfile>
  );
}
