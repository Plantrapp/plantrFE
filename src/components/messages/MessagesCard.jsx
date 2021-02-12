import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";
import axios from "axios";

const StyledMessagesCard = Styled.div`
  display: flex;
  color: whitesmoke;
  border-radius:10px;
  margin-bottom: 1%;
  padding: 2%;      
  background: #292929;
  transition: 0.3s ease-in-out;
  &:hover{
    cursor: pointer;
  background: #303030;
  }
  div{
    display: flex;
    align-items: center;
  }
  .conversation-img {
    width: 10%;
    justify-content: center;
    img{
      width:50%;
    }
  }
  .conversation-name {
    text-align: left;
    width: 20%;
  }
  .conversation-message {
    width: 70%;
  }
`;
export default function MessagesCard(props) {
  const { pic, user } = props;
  const history = useHistory();

  return (
    <StyledMessagesCard
      onClick={() => history.push(`/dashboard/conversation/${user.username}`)}
    >
      <div className="conversation-img">
        <img src={pic} alt="" />
      </div>
      <div className="conversation-name">
        {user.first_name}
        <br />
        {user.last_name}
      </div>
      <div className="conversation-message">MESSAGE PIECE</div>
    </StyledMessagesCard>
  );
}
