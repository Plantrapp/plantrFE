import React from "react";
import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";

const ProfPicContainer = styled.div`
  position: relative;

  div {
    width: 50%;
    cursor: pointer;
    margin: 0 auto;
    border-radius: 50%;

    &:hover img {
      opacity: 0.3;
    }
    &:hover p {
      opacity: 1;
    }
  }

  p {
    position: absolute;
    top: 50%;
    text-align: center;
    width: 50%;
    transition: 0.5 ease;
    opacity: 0;
  }
  img {
    opacity: 1;
    width: 100%;
    border-radius: 50%;
    transition: 0.5 ease;
  }
`;

export default function ProfilePicture(props) {
  return (
    <ProfPicContainer onClick={props.onClick} className="left">
      <div>
        <img src={props.source} alt="user profile" />
        <p>
          <FaUserEdit /> Edit profile picture
        </p>
      </div>
    </ProfPicContainer>
  );
}
