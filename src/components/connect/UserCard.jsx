import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import pic from "../../assets/img/user-profile.png";
import Styled from "styled-components";

const StyledUserCard = Styled.div`
background: #292929;
border-radius: 10px;
padding: 2%;
margin: 1%;
transition: 0.15s ease-in-out;
color:whitesmoke;
width: 14.68vw;
&:hover{
  cursor: pointer;
  background: #303030;
}
  img{
    width:50%;
  }
  div{
    text-align: left;
  }
  .footer{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .arrowright{
    background: transparent;
    color: white;
    border: none;
    border-radius: 50%;
    transition: 0.3s ease-in-out;
    width: 25%;
    filter: invert(48%) sepia(79%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%);
    &:hover{
      background: #000000;
      cursor: pointer;
    }
  }
  h6{
    margin: 0;
    padding: 0;
  }
`;

export default function UserCard(props) {
  const history = useHistory();

  const { first_name, last_name, role, hourly_rate } = props.growr;
  return (
    <StyledUserCard
      onClick={() =>
        history.push(`/dashboard/growrProfile/${props.growr.username}`)
      }
    >
      <img src={pic} />
      <div>
        <h3>
          {first_name}{" "}
          {last_name.length > 10 ? `${last_name.split("").pop(0)}.` : last_name}
        </h3>
        <p>{role}</p>
        <div className="footer">
          <h6>${hourly_rate.toFixed(2)} / hr</h6>
        </div>
      </div>
    </StyledUserCard>
  );
}
