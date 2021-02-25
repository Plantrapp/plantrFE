import React, { useState, useEffect, useContext } from "react";
import { Route, useHistory } from "react-router-dom";
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
  NewPost,
  EditPost,
} from "../components";
import axios from "axios";
import { UserContext, CurrentUserContext } from "../utils/contexts/Contexts";
import { useSocket } from "../utils/contexts/SocketProvider";

export default function Dashboard(props) {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const username = localStorage.getItem("username");
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    if (!username) history.push("/");
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
        <div>
          <Route exact path="/dashboard" component={BlogList} />
          <Route path="/dashboard/blogs" component={Blog} />
          <Route exact path="/dashboard/connect" component={Connect} />
          <Route exact path="/dashboard/messages" component={Messages} />
          <Route path="/dashboard/conversation" component={Conversation} />
          <Route exact path="/dashboard/settings" component={Settings} />
          <Route exact path="/dashboard/map" component={Map} />
          <Route path="/dashboard/growrProfile" component={GrowrProfile} />
          <Route path="/dashboard/user-profile" component={UserProfile} />
          <Route exact path="/dashboard/blog-post" component={NewPost} />
          <Route exact path="/dashboard/blog-post/edit" component={EditPost} />
        </div>
      </UserContext.Provider>
    </>
  );
}
