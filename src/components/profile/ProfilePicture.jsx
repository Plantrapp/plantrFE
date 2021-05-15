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
    opacity: 0.7;
  }
`;
const StyledP = styled.p`
  text-align: center;
  position: absolute;
`;

export default function ProfilePicture(props) {
  return props.hovering ? (
    <ProfPicContainer onClick={props.onClick}>
      <img src={props.source} />
      <p>
        <FaUserEdit /> Edit profile picture
      </p>
    </ProfPicContainer>
  ) : (
    <img src={pic} />
  );
}
