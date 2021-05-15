import React from "react";
import Styled from "styled-components";

const StyledConversationBubble = Styled.div`
  div {
    text-align: left;
    margin: 1% 2%;
    border-radius: 8px;
    padding: 0.5rem 1rem;
  }
  .self{
    float: right;
    max-width: 60%;
    min-width: 30%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    & > div {
      background: #4343b9;
      width: 100%;
      margin: 0;
      overflow-wrap: break-word;
    }
    & > span {
      margin-left: 1%;
    }
  }
  .other{
    float: left;
    max-width: 60%;
    min-width: 30%;
    display: flex;
    align-items: flex-end;
    & > div {
      background: #43b982;
      width: 100%;
      margin: 0;
      overflow-wrap: break-word;
    }
    & > span {
      margin-right: 1%;
    }
  }

`;

export default function ConversationBubble(props) {
  const { messages, username } = props;
  return (
    <div className="messagesContainer">
      {messages.map((msg) => {
        const { message, sender } = msg;
        return username === sender ? (
          <StyledConversationBubble>
            <div className="self">
              <div>{message}</div>
              <span>{username}</span>
            </div>
          </StyledConversationBubble>
        ) : (
          <StyledConversationBubble>
            <div className="other">
              <span>{sender}</span>
              <div>{message}</div>
            </div>
          </StyledConversationBubble>
        );
      })}
    </div>
  );
}
