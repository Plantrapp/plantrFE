import React from "react";
import Styled from "styled-components";
import MessagesCard from "./MessagesCard";
import NoConnections from "./NoConnections";

const StyledMessages = Styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 85vw;
  max-height: 100vh;
  padding: 2%;
  overflow-y: auto;
`;

export default function Messages({ connections }) {
  return (
    <StyledMessages>
      {connections && connections.length > 0 ? (
        connections.map((user) => <MessagesCard user={user} />)
      ) : (
        <NoConnections />
      )}
    </StyledMessages>
  );
}
