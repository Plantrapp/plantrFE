import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import { FaSlidersH } from "react-icons/fa";
const StyledSearchbar = Styled.div` 
  display: flex;
  height:10vh;
  align-items: center;
  width: 85vw;
  justify-content: flex-end;
  padding-right: 4vw;
  .featureless-input{
    background-color: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgb(255, 255, 255);
    outline: none;
    padding: 0% 2%;
    width: 90%;
    color: rgb(255, 255, 255);
    margin: 2% 0;
    width: 30vw;
  }
  .featureless-input:focus{
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px solid rgb(255, 255, 255);
    border-radius: 0;
    outline-style: none;
    text-decoration: none;
    color: rgb(255, 255, 255);

  }
  button{
    background: transparent;
    color: whitesmoke;
    border: none;
    border-radius: 5px;
    width: 5%;
    height: 27%;
    transition: 0.3s ease-in-out;
    &.search{
     border-bottom: 1px solid whitesmoke;
    }
    &:hover{
      background: #292929;
    }
  }
  img{
    filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(135deg) brightness(118%) contrast(119%);
  }
`;
export default function Searchbar() {
  return (
    <StyledSearchbar>
      <input
        type="text"
        name=""
        placeholder="search"
        className="featureless-input"
      />
      <button>
        <FaSlidersH />
      </button>
    </StyledSearchbar>
  );
}
