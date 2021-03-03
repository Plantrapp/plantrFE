import React from "react";
import Styled from "styled-components";

const StyledPortfolioItem = Styled.div`
  border-radius: 3px;
  width: 33%;
  margin: 0.15%;
  img{ 
    width:100%;
    height:100%;
  } 
`;
export default function PortfolioItem(props) {
  const { pic, show, setModalImg } = props;
  const spawnModal = () => {
    setModalImg(pic);
    show();
  };
  return (
    <StyledPortfolioItem>
      <img src={pic} alt="" onClick={spawnModal} />
    </StyledPortfolioItem>
  );
}
