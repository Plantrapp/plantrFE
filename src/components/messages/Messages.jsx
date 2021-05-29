import React, { useState, useEffect, useContext } from "react";
import Styled from "styled-components";
import MessagesCard from "./MessagesCard";
import NoConnections from "./NoConnections";

import { CurrentUserContext } from "../../utils/contexts/Contexts";
import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";
const StyledMessages = Styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 85vw;
  max-height: 100vh;
  padding: 5% 2%;
  overflow-y: auto;
`;

export default function Messages() {
  const [userGroup, setUserGroup] = useState([]);

  const isGrowr = sessionStorage.getItem("isGrowr");
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser) return;
    const id = currentUser.id;

    if (isGrowr > 0) {
      axiosWithAuth()
        .get(`/client-growr-connection/growr/${id}`)
        .then((res) => {
          setUserGroup(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axiosWithAuth()
        .get(`/client-growr-connection/dwellr/${id}`)
        .then((res) => {
          setUserGroup(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);
  return (
    <StyledMessages>
      {userGroup.length > 0 ? (
        userGroup.map((user) => <MessagesCard user={user} />)
      ) : (
        <NoConnections />
      )}
    </StyledMessages>
  );
}
