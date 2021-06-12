import React from "react";
import Styled from "styled-components";

const StyledPortfolioItem = Styled.div`
  border-radius: 3px;

  margin: 0.15%;
  height: 350px;
  img{ 
    width:100%;
    height:100%;
    object-fit: cover;
  } 
`;
export default function PortfolioItem(props) {
  const { item, show, setModalInfo } = props;
  const spawnModal = () => {
    setModalInfo(item);

    show();
  };

  return (
    <StyledPortfolioItem>
      <img src={item.url} alt="" onClick={spawnModal} />
    </StyledPortfolioItem>
  );
}
