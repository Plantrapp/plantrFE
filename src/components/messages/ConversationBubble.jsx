import axios from "axios";
import React, { useEffect } from "react";
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
  return (
    <StyledConversationBubble>
      {props.username === props.item.text.sender ? (
        <div className="self">
          <div>{props.item.text.message}</div>
          <span>{props.item.text.sender}</span>
        </div>
      ) : (
        <div className="other">
          <span>{props.item.text.sender}</span>
          <div>{props.item.text.message}</div>
        </div>
      )}
    </StyledConversationBubble>
  );
}
