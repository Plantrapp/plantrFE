import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Styled from "styled-components";
import pic from "../assets/img/user-profile.png";
import MessagesCard from "./MessagesCard";
const StyledMessages = Styled.div`
  border: 1px solid red;
  height:90vh;
  padding: 2%;
  overflow-y: auto;
`;

export default function Messages() {
  const [userGroup, setUserGroup] = useState([]);
  const baseURL = "http://localhost:5000";
  useEffect(() => {
    axios
      .get(`${baseURL}/user`)
      .then((res) => setUserGroup(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <StyledMessages>
      {userGroup.map((user) => (
        <MessagesCard pic={pic} user={user} />
      ))}
    </StyledMessages>
  );
}
