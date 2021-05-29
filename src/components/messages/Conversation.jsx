import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import Styled from "styled-components";
import { useSocket } from "../../utils/contexts/SocketProvider";
import ConversationBubble from "./ConversationBubble";
import { CurrentUserContext } from "../../utils/contexts/Contexts";
import useTools from "../../utils/useTools";

import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";
const StyledConversation = Styled.div`
  height: 100vh;
  padding: 2%;
  width: 85vw;
  color: whitesmoke;
  #form {
    background: transparent;
    padding: 0.25rem;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 3rem;

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
    background: transparent;
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
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .conversation-heading{
    display: flex;
    width: 100%;

    align-items: center;
    padding: 0.5%;
    img{
      width: 5%;
    }
    h1{
      margin-left: 2%;
      width: 50%;
    }
  }
`;

export default function Conversation(props) {
  const username = sessionStorage.getItem("username");
  const { getHistoryState } = useTools();
  const socket = useSocket();
  const recipient = getHistoryState().recipient.username;
  const recipient_id = getHistoryState().recipient.id;
  const recipientObj = getHistoryState().user;
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    currentUser &&
      axiosWithAuth()
        .get(`/message/${currentUser.id}/${recipient_id}`)
        .then((res) => {
          setMessages(res.data.sort((a, b) => a.id - b.id));
        })
        .catch((err) => console.log(err));
  }, [currentUser]);

  const addMessage = useCallback(
    ({ message, sender }) => {
      setMessages((messages) => [...messages, { message, sender }]);
    },
    [setMessages]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessage);

    return () => socket.off("receive-message");
  }, [socket, addMessage]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const sender = username;
    const message = formValue.text;
    const created_at = new Date().toString();
    socket.emit("send-message", { recipient: recipient_id, message, sender });

    setMessages((messages) => [...messages, { message, sender }]);

    axiosWithAuth()
      .post(`/message`, {
        message,
        recipient,
        recipient_id,
        sender,
        sender_id: currentUser.id,
        created_at,
      })
      .then(() => {})
      .catch((err) => console.log(err));

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

  return (
    <StyledConversation>
      <div className="conversation-heading">
        <img
          src={recipientObj.profile_picture}
          alt="profile"
          style={{ width: "5%" }}
        />
        <h1 style={{ textAlign: "left" }}>
          {recipientObj.first_name} {recipientObj.last_name}
        </h1>
      </div>
      <ConversationBubble messages={messages} username={username} />

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
