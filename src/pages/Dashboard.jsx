import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext, useCurrentUserContext } from "../utils/contexts/Contexts";
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
  Rating,
  GrowrProfile,
  SubscribeButton,
  The404,
} from "../components";
import {
  axiosWithAuth,
  cancelToken,
} from "../utils/authentication/AxiosWithAuth";

export default function Dashboard() {
  const socket = useSocket();
  const [users, setUsers] = useState([]);
  const username = sessionStorage.getItem("username");
  const [connections, setConnections] = useState([]);
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const { goToPage } = useTools();

  useEffect(() => {
    if (!username) goToPage("/");
    if (currentUser) {
      const room_id = currentUser.id;
      socket && socket.emit("loggedIn", { username, room_id });
      currentUser.isGrowr
        ? fetch("growr", currentUser.id)
        : fetch("dwellr", currentUser.id);
    }
    axiosWithAuth()
      .get(`/user`)
      .then((res) => {
        setUsers(res.data.filter((user) => user.username !== username));
      })
      .catch((err) => console.log(err));

    if (!currentUser) {
      axiosWithAuth()
        .get(`/user/info/${username}`)
        .then((res) => {
          setCurrentUser(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser]);

  async function fetch(role, id) {
    let result;

    await axiosWithAuth()
      .get(`/client-growr-connection/${role}/${id}`, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        result = res.data;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setConnections(result);
      });
  }

  return (
    <>
      <UserContext.Provider value={{ users, setUsers }}>
        {currentUser && <SideBar />}
        {currentUser && currentUser.isSubscribed > 0 ? (
          <div>
            <Switch>
              <Route exact path="/dashboard" component={BlogList} />
              <Route path="/dashboard/blogs" component={Blog} />
              <Route exact path="/dashboard/messages">
                <Messages
                  connections={connections}
                  setConnections={setConnections}
                />
              </Route>
              <Route path="/dashboard/conversation" component={Conversation} />
              <Route exact path="/dashboard/settings" component={Settings} />
              <Route exact path="/dashboard/map" component={Map} />
              <Route path="/dashboard/growrProfile">
                <GrowrProfile
                  connections={connections}
                  setConnections={setConnections}
                />
              </Route>
              <Route path="/dashboard/dwellrProfile">
                <GrowrProfile
                  connections={connections}
                  setConnections={setConnections}
                />
              </Route>
              <Route path="/dashboard/user-profile" component={UserProfile} />
              <Route path="/dashboard/rating" component={Rating} />
              <Route exact path="/dashboard/blog-post" component={NewPost} />
              <Route
                exact
                path="/dashboard/blog-post/edit"
                component={EditPost}
              />

              <Route exact path="/dashboard/connect" component={Connect} />

              <Route component={The404} />
            </Switch>
          </div>
        ) : (
          <SubscribeButton />
        )}
      </UserContext.Provider>
    </>
  );
}
