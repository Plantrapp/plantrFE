import React from "react";
import Styled from "styled-components";
import useTools from "../../utils/useTools";

const StyledMessagesCard = Styled.div`
  display: flex;
  color: whitesmoke;

  padding: 2%;
  transition: 0.3s ease-in-out;
  border-bottom: 1px solid white;
  &:hover{
    cursor: pointer;
    background: #303030;
  }
  div{
    display: flex;
    align-items: center;
  }
  .conversation-img {
    width: 20%;
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

  const { goToPage } = useTools();

  const goToConvo = () =>
    goToPage(`/dashboard/conversation/${user.username}`, {
      recipient: {
        username: user.username,
        id: user.id,
      },
    });

  return (
    <StyledMessagesCard onClick={goToConvo}>
      <div className="conversation-img">
        <img src={pic} alt="" />
      </div>
      <div className="conversation-name">
        <h2>
          {user.first_name} {user.last_name}
        </h2>
      </div>
    </StyledMessagesCard>
  );
}
