import React, { useContext } from "react";
import Styled from "styled-components";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import Subscribe from "./Subscribe";

const StyledSubscribeButton = Styled.div`
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

export default function SubscribeButton() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    currentUser && (
      <StyledSubscribeButton>
        <h1>
          You have not subscribed to our Growr service or your subscription
          needs to be renewed. Please click the button below to renew your
          subscription.
        </h1>

        <button
          className="valid-button"
          onClick={() => Subscribe(currentUser.id)}
        >
          Subscribe
        </button>
      </StyledSubscribeButton>
    )
  );
}
