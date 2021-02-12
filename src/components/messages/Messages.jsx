import React, { useState, useEffect } from "react";
import axios from "axios";
import Styled from "styled-components";
import pic from "../../assets/img/user-profile.png";
import MessagesCard from "./MessagesCard";

const StyledMessages = Styled.div`
  height:100vh;
  padding: 2%;
  overflow-y: auto;
  width: 85vw;
`;

export default function Messages() {
  const [userGroup, setUserGroup] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${baseURL}/user`)
      .then((res) => {
        // if (role === "Growr") return setUserGroup([]);
        return setUserGroup(res.data.filter((user) => user.isGrowr === 1));
      })
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
