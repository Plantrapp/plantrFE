import React from "react";
import UserCard from "./UserCard";
import Styled from "styled-components";
import Searchbar from "./Searchbar";

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
      {growrs.map((growr) =>
        growr.isSubscribed ? <UserCard growr={growr} key={growr.id} /> : null
      )}
    </StyledGrowrView>
  );
}
