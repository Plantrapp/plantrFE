import React from "react";
import Styled from "styled-components";
import useTools from "../../utils/useTools";
import { useCurrentUserContext } from "../../utils/contexts/Contexts";

const StyledNoConnect = Styled.div`
  width: 85vw; 
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  flex-direction: column;
  text-align: left;
  padding 2%;

  .valid-button{
    width: 20%;
    margin:1%;
    background: transparent;
    color: whitesmoke;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    padding: .5%;
    transition: 0.3s ease-in-out;
    border: 1px solid whitesmoke;
    &:hover{
      background: #525151;
    }
  }
`;

export default function NoConnections() {
  const { goToPage } = useTools();
  const { currentUser } = useCurrentUserContext();
  return (
    currentUser && (
      <StyledNoConnect>
        <h1>No messages available</h1>
        {currentUser.isGrowr > 0 ? (
          <>
            <h2>
              Engage with the community to get Dwellrs to connect with you.
            </h2>
            <button
              className="valid-button"
              onClick={() => goToPage("/dashboard/blog-post")}
            >
              Make a new post
            </button>
          </>
        ) : (
          <>
            <h2>Connect with Growrs to send messages.</h2>
            <button
              className="valid-button"
              onClick={() => goToPage("/dashboard/connect")}
            >
              Go connect
            </button>
          </>
        )}
      </StyledNoConnect>
    )
  );
}
