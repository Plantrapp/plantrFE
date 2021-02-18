import React, { useState, useContext } from "react";
import UserCard from "./UserCard";
import Styled from "styled-components";
import Searchbar from "./Searchbar";
import { UserContext } from "../../utils/contexts/Contexts";

const StyledGrowrView = Styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 85vw;
  max-height: 90vh;
  padding: 0 2%;
`;
export default function GrowrView(props) {
  const [role, setRole] = useState(localStorage.getItem("role"));

  const { growrs } = props;

  return (
    <StyledGrowrView>
      <Searchbar />
      {growrs.map((growr) => (
        <UserCard growr={growr} key={growr.id} />
      ))}
    </StyledGrowrView>
  );
}
