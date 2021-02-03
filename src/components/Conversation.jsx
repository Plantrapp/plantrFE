import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Styled from "styled-components";
import pic from "../assets/img/user-profile.png";
import MessagesCard from "./MessagesCard";

const StyledConversation = Styled.div`
  height:90vh;
  padding: 2%;

  #form {
    background: rgba(0, 0, 0, 0.15);
    padding: 0.25rem;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 3rem;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
  }
  #input {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
    border-radius: 2rem;
    margin: 0.25rem;
  }
  #input:focus {
    outline: none;
  }
  #form > button {
    background: rgba(255, 255, 255, 0);
    border: none;
    padding: 0 1rem;
    margin: 0.25rem;
    border-radius: 3px;
    outline: none;
    color: whitesmoke;
    transition: 0.3s ease-in-out;
    &:hover {
      background: #1fdbac;
    }
  }
  .messagesContainer{
    background: #272727;
    border-radius: 10px;

    height: 80vh;
    margin-bottom: 0.5%;
    overflow-y: auto;
  }
  #messages {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  #messages > li {
    padding: 0.5rem 1rem;
  }
  #messages > li:nth-child(odd) {
    background: #efefef;
  }
`;
export default function Conversation() {
  return (
    <StyledConversation>
      <div className="messagesContainer">
        <ul id="messages"></ul>
      </div>
      <form id="form" action="">
        <input id="input" autocomplete="off" />
        <button>Send</button>
      </form>
    </StyledConversation>
  );
}
