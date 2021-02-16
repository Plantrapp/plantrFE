import React, { useState, useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import {
  SideBar,
  GrowrView,
  GrowrProfile,
  Settings,
  Map,
  Messages,
  Conversation,
  BlogList,
  Blog,
} from "../components";
import axios from "axios";
import { UserContext } from "../utils/contexts/Contexts";
import { CurrentUserContext } from "../utils/contexts/Contexts";

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

  const growrs = users.filter((user) => user.isGrowr === 1);
  return (
    <>
      <UserContext.Provider value={{ users, growrs }}>
        <SideBar />
        <div>
          <Route exact path="/dashboard" component={BlogList} />
          <Route path="/dashboard/blogs" component={Blog} />
          <Route path="/dashboard/connect" component={GrowrView} />
          <Route path="/dashboard/messages" component={Messages} />
          <Route path="/dashboard/conversation" component={Conversation} />
          <Route path="/dashboard/settings" component={Settings} />
          <Route path="/dashboard/map" component={Map} />
          <Route path="/dashboard/growrProfile" component={GrowrProfile} />
        </div>
      </UserContext.Provider>
    </>
  );
}
