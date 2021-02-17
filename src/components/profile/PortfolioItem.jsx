import React from "react";
import Styled from "styled-components";

const StyledPortfolioItem = Styled.div`
  min-height: 16rem;
  min-width: 16rem;
  margin:2% 5.75%;
  border-radius: 3px;
  img{ 
    width:100%;
    height:100%;
  } 
`;
export default function PortfolioItem(props) {
  const { pic } = props;
  return (
    <StyledPortfolioItem>
      <img src={pic} alt="" />
    </StyledPortfolioItem>
  );
}
