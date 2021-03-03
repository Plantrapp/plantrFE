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
  overflow-y: auto;
`;
export default function GrowrView(props) {
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