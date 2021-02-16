import React, { useEffect, useState, useContext } from "react";
import UserCard from "./UserCard";
import Styled from "styled-components";
import axios from "axios";
import Searchbar from "./Searchbar";
import {UserContext} from "../../utils/contexts/Contexts"
import geocoder from "react-geocode"

const StyledGrowrView = Styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 85vw;
  max-height: 90vh;
  padding: 0 2%;
  overflow-y: auto;
`;
export default function GrowrView() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  
  const {growrs} = useContext(UserContext)

  
  return (
    

    <StyledGrowrView>
      <Searchbar />
      {growrs.map((growr) => (
        
        <UserCard growr={growr} key={growr.id} />
      ))}
    </StyledGrowrView>
      
  );
}
