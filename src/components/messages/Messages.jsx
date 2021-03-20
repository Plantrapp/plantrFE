import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Styled from "styled-components";
import pic from "../../assets/img/user-profile.png";
import MessagesCard from "./MessagesCard";

import { CurrentUserContext } from "../../utils/contexts/Contexts";
const StyledMessages = Styled.div`
  height:100vh;
  padding: 2%;
  overflow-y: auto;
  width: 85vw;
`;

export default function Messages() {
  const [userGroup, setUserGroup] = useState();
  const baseURL = "https://obscure-beyond-36960.herokuapp.com";
  const isGrowr = localStorage.getItem("isGrowr");
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser) return;
    const id = currentUser.id;

    if (isGrowr > 0) {
      console.log("run Growr");
      axios
        .get(`${baseURL}/client-growr-connection/growr/${id}`)
        .then((res) => {
          setUserGroup(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("run dweller");
      axios
        .get(`${baseURL}/client-growr-connection/dwellr/${id}`)
        .then((res) => {
          setUserGroup(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);
  return (
    <StyledMessages>
      {userGroup &&
        userGroup.map((user) => <MessagesCard pic={pic} user={user} />)}
    </StyledMessages>
  );
}
