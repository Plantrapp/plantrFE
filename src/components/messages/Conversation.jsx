import React, { useState, useEffect, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Styled from "styled-components";
import { useSocket } from "../../utils/contexts/SocketProvider";
import pic from "../../assets/img/user-profile.png";
import ConversationBubble from "./ConversationBubble";
import { CurrentUserContext } from "../../utils/contexts/Contexts";

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
  const username = localStorage.getItem("username");
  const socket = useSocket();
  const recipient = useHistory().location.state.recipient.username;
  const recipient_id = useHistory().location.state.recipient.id;
  console.log(useHistory().location.state);
  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/message/${currentUser.id}/${recipient_id}`)
      .then((res) => {
        setMessages(res.data.sort((a, b) => a.id - b.id));
      })
      .catch((err) => console.log(err));
  }, []);

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
    console.log("recipient", recipient_id);
    console.log("currentUser", currentUser.id);
    axios
      .post(`http://localhost:5000/message`, {
        message,
        recipient,
        recipient_id,
        sender,
        sender_id: currentUser.id,
        created_at,
      })
      .then((res) => console.log(res))
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
