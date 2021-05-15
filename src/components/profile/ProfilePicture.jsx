import React from "react";
import pic from "../../assets/img/user-profile.png";
import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";

const ProfPicContainer = styled.div`
  position: relative;
  cursor: pointer;

  p {
    position: absolute;
    top: 50%;
    text-align: center;
    width: 100%;
  }
  img {
    opacity: 1;
    width: 100%;
    border-radius: 50%;
  }
`;

export default function ProfilePicture(props) {
  return props.hovering ? (
    <ProfPicContainer onClick={props.onClick} className="left">
      <img src={props.source} alt="user profile" />
      <p>
        <FaUserEdit /> Edit profile picture
      </p>
    </ProfPicContainer>
  ) : (
    <ProfPicContainer className="left">
      <img src={props.source} alt="user profile" />
    </ProfPicContainer>
  );
}
