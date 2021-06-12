import React from "react";
import Styled from "styled-components";
import useTools from "../../utils/useTools";

const StyledMessagesCard = Styled.div`
background: #292929;
border-radius: 10px;
padding: 2%;
margin: 1%;
transition: 0.15s ease-in-out;
color:whitesmoke;
width: 14.68vw;

  &:hover{
    background: #303030;
  }
  img{
    width:50%;
    border-radius: 50%;
  }
  div{
    text-align: left;
  }
  .footer{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  h6{
    margin: 0;
    padding: 0;
  }
  .button-array{
    display: flex;
    flex-wrap: wrap;
    .button1{
      width: 100%;
      margin:1%;
      background-color: #1ac197;
      color: whitesmoke;
      border: none;
      border-radius: 5px;
      padding: .5%;
      transition: 0.3s ease-in-out;

      &:hover{
        background: #128f70;
      }
    }
    .button2{
      width: 100%;
      margin:1%;
      background: transparent;
      color: whitesmoke;

      border-radius: 5px;
      padding: .5%;
      transition: 0.3s ease-in-out;
      border: none;
      &:hover{
        background: #525151;
      }
    }
  } 
`;

export default function MessagesCard(props) {
  const { user } = props;

  const { goToPage } = useTools();

  const goToConversation = () =>
    goToPage(`/dashboard/conversation/${user.username}`, {
      recipient: {
        username: user.username,
        id: user.id,
      },
      user: user,
    });

  const goToProfile = () => {
    if (user.isGrowr) {
      goToPage(`/dashboard/growrprofile/${user.username}`, user);
    } else {
      goToPage(`/dashboard/dwellrprofile/${user.username}`, user);
    }
  };

  return (
    <StyledMessagesCard key={user.id}>
      <img src={user.profile_picture} alt="profile" />
      <div>
        <h3>
          {user.first_name}{" "}
          {user.last_name.length > 10
            ? `${user.last_name.split("").pop(0)}.`
            : user.last_name}
        </h3>
      </div>
      <div className="button-array">
        <button className="button1" onClick={goToConversation}>
          Message
        </button>
        <button className="button2" onClick={goToProfile}>
          View Profile
        </button>
      </div>
    </StyledMessagesCard>
  );
}
