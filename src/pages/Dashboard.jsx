import React, { useState, useEffect, useContext } from "react";
import { Route } from "react-router-dom";

import axios from "axios";
import { UserContext, CurrentUserContext } from "../utils/contexts/Contexts";
import { useSocket } from "../utils/contexts/SocketProvider";
import useTools from "../utils/useTools";
import {
  SideBar,
  Settings,
  Map,
  Messages,
  Conversation,
  BlogList,
  Blog,
  Connect,
  UserProfile,
  NewPost,
  EditPost,
  NewPortfolioPost,
  Rating,
  SubscribeButton,
} from "../components";

export default function Dashboard() {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const username = localStorage.getItem("username");

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const baseURL = "https://obscure-beyond-36960.herokuapp.com";
  const { goToPage } = useTools();

  useEffect(() => {
    if (!username) goToPage("/");
    if (currentUser) {
      const room_id = currentUser.id;
      socket && socket.emit("loggedIn", { username, room_id });
    }
    axios
      .get(`${baseURL}/user`)
      .then((res) => {
        setUsers(res.data.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));

    if (!currentUser) {
      axios
        .get(`${baseURL}/user/info/${username}`)
        .then((res) => {
          console.log(res);
          setCurrentUser(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser]);

  return (
    <>
      <UserContext.Provider value={{ users, setUsers }}>
        <SideBar />
        {currentUser && currentUser.isSubscribed > 0 ? (
          <div>
            <Route exact path="/dashboard" component={BlogList} />
            <Route path="/dashboard/blogs" component={Blog} />
            <Route exact path="/dashboard/connect" component={Connect} />
            <Route exact path="/dashboard/messages" component={Messages} />
            <Route path="/dashboard/conversation" component={Conversation} />
            <Route exact path="/dashboard/settings" component={Settings} />
            <Route exact path="/dashboard/map" component={Map} />
            <Route path="/dashboard/growrProfile" component={UserProfile} />
            <Route path="/dashboard/user-profile" component={UserProfile} />
            <Route path="/dashboard/rating" component={Rating} />
            <Route exact path="/dashboard/blog-post" component={NewPost} />
            <Route
              exact
              path="/dashboard/portfolio-post"
              component={NewPortfolioPost}
            />
            <Route
              exact
              path="/dashboard/blog-post/edit"
              component={EditPost}
            />
          </div>
        ) : (
          <SubscribeButton />
        )}
      </UserContext.Provider>
    </>
  );
}
