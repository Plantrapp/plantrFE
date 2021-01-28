import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Styled from "styled-components";
import axios from "axios";

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
  const baseURL = "http://localhost:5000";
  useEffect(() => {
    axios
      .get(`${baseURL}/user`)
      .then((res) => setUserGroup(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <StyledGrowrView>
      {userGroup.map((growr) => (
        <UserCard growr={growr} />
      ))}
    </StyledGrowrView>
  );
}
