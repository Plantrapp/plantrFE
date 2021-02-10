import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Styled from "styled-components";
import { io } from "socket.io-client";

import useLocalStorage from "../hooks/useLocalStorage";

import pic from "../assets/img/user-profile.png";
import MessagesCard from "./MessagesCard";
import ConversationBubble from "./ConversationBubble";

const StyledConversation = Styled.div`
  height: 100vh;
  padding: 2%;
  width: 85vw;
  color: whitesmoke;
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
    height: 91vh;
    margin-bottom: 0.5%;
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
export default function Conversation(props) {
  const [socket, setSocket] = useState();
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  useEffect(() => {
    setSocket(
      io("localhost:5000", {
        query: {
          username,
        },
      })
    );
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.on("message", (text) => {
      console.log("HERE", text);
      const recipient = window.location.pathname.split("/").pop();
      setMessages([...messages, { username, text }]);
      axios.post("http://localhost:5000/message", {
        sender: username,
        recipient,
        message: text.message,
      });
    });
    socket.emit("message", formValue.text);
    setFormValue({
      text: "",
    });
  };

  const handleOnchange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  console.log(messages);
  return (
    <StyledConversation>
      <div className="messagesContainer">
        {messages.map((item) => (
          <ConversationBubble item={item} username={username} />
        ))}
      </div>
      <form id="form" action="">
        <input
          id="input"
          name="text"
          autocomplete="off"
          value={formValue.text}
          onChange={handleOnchange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </form>
    </StyledConversation>
  );
}
