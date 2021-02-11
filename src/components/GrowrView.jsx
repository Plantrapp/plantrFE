import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Styled from "styled-components";
import axios from "axios";
import Searchbar from "./Searchbar";

const StyledGrowrView = Styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 85vw;
  max-height: 90vh;
  padding: 0 2%;
  overflow-y: auto;
`;
export default function GrowrView() {
  const [userGroup, setUserGroup] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const baseURL = "http://localhost:5000";
  useEffect(() => {
    axios
      .get(`${baseURL}/user`)
      .then((res) => {
        console.log(res.data);
        if (role === "Growr") return setUserGroup([]);
        return setUserGroup(res.data.filter((user) => user.isGrowr === 1));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <StyledGrowrView>
      <Searchbar />
      {userGroup.map((growr) => (
        <UserCard growr={growr} key={growr.id} />
      ))}
    </StyledGrowrView>
  );
}
