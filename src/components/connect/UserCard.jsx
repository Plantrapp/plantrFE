import React from "react";
import pic from "../../assets/img/user-profile.png";
import Styled from "styled-components";
import useTools from "../../utils/useTools";
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
    border-radius: 50%;
  }
  div{
    text-align: left;
  }
  .footer{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  h6{
    margin: 0;
    padding: 0;
  }
`;

export default function UserCard(props) {
  const {
    first_name,
    last_name,
    role,
    hourly_rate,
    distance,
    username,
    profile_picture,
  } = props.growr;
  const growr = props.growr;
  const { goToPage } = useTools();

  const goToGrowrProfile = () =>
    goToPage(`/dashboard/growrProfile/${username}`, growr);

  return (
    <StyledUserCard onClick={goToGrowrProfile}>
      <img src={profile_picture} alt="user profile" />
      <div>
        <h3>
          {first_name}{" "}
          {last_name.length > 10 ? `${last_name.split("").pop(0)}.` : last_name}
        </h3>
        <p>{role}</p>
        <p>{distance} miles away</p>
        <div className="footer">
          <h6>${hourly_rate.toFixed(2)} / hr</h6>
        </div>
      </div>
    </StyledUserCard>
  );
}
