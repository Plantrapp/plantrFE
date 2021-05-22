import React from "react";
import Styled from "styled-components";
import useTools from "../../utils/useTools";

const Styled404 = Styled.div`
  width: 85vw; 
  height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  flex-direction: column;
  text-align: left;
  padding 2%;

  .valid-button{
    width: 20%;
    margin:1%;
    background: transparent;
    color: whitesmoke;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    padding: .5%;
    transition: 0.3s ease-in-out;
    border: 1px solid whitesmoke;
    &:hover{
      background: #525151;
    }
  }
`;

export default function The404() {
  const { goToPage } = useTools();
  return (
    <Styled404>
      <h1>Oops... 404</h1>
      <h2>The page you requested does not exist.</h2>

      <button className="valid-button" onClick={() => goToPage("/dashboard")}>
        Go back home
      </button>
    </Styled404>
  );
}
