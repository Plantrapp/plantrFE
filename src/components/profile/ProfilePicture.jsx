import React from "react";
import axios from "axios";
import pic from "../../assets/img/user-profile.png";
import styled from "styled-components";
import { FaUserEdit } from "react-icons/fa";

const ProfPicContainer = styled.div`
  border: 1px solid white;
  img {
    width: 100%;
  }
`;

export default function ProfilePicture(props) {
  return (
    <ProfPicContainer>
      {props.hovering ? (
        <div>
          <img src={pic} />
          <p>
            <FaUserEdit /> Edit profile picture
          </p>
        </div>
      ) : (
        <img src={pic} />
      )}
    </ProfPicContainer>
  );
}
