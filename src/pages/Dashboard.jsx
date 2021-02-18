import React, { useState, useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import {
  SideBar,
  GrowrProfile,
  Settings,
  Map,
  Messages,
  Conversation,
  BlogList,
  Blog,
  Connect,
  UserProfile,
} from "../components";
import axios from "axios";
import { UserContext, CurrentUserContext } from "../utils/contexts/Contexts";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const username = localStorage.getItem("username");

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const baseURL = "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${baseURL}/user`)
      .then((res) => {
        setUsers(res.data.filter((user) => user.username != username));
      })
      .catch((err) => console.log(err));

    if (!currentUser) {
      axios
        .get(`${baseURL}/user/info/${username}`)
        .then((res) => {
          setCurrentUser(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ users, setUsers }}>
        <SideBar />
        <div>
          <Route exact path="/dashboard" component={BlogList} />
          <Route path="/dashboard/blogs" component={Blog} />
          <Route path="/dashboard/connect" component={Connect} />
          <Route path="/dashboard/messages" component={Messages} />
          <Route path="/dashboard/conversation" component={Conversation} />
          <Route path="/dashboard/settings" component={Settings} />
          <Route path="/dashboard/map" component={Map} />
          <Route path="/dashboard/growrProfile" component={GrowrProfile} />
          <Route path="/dashboard/user-profile" component={UserProfile} />
        </div>
      </UserContext.Provider>
    </>
  );
}
