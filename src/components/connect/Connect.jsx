import React, { useState, useContext } from "react";
import ListView from "./ListView";
import MapView from "../map/Map";
import { Tabs, Tab } from "react-bootstrap";
import { FaMap, FaListUl } from "react-icons/fa";
import haversine from "haversine";
import { CurrentUserContext, UserContext } from "../../utils/contexts/Contexts";

export default function Connect() {
  const [key, setKey] = useState("listView");
  const { users, setUsers } = useContext(UserContext);
  //   const [cGrowrs, setCGrowrs] = useState(growrs);
  const { currentUser } = useContext(CurrentUserContext);

  const growrs = [];

  currentUser &&
    users
      .filter((user) => user.isGrowr === 1)
      .map((user) => {
        user.distance = Math.round(
          haversine(
            {
              latitude: currentUser.lat,
              longitude: currentUser.lng,
            },
            { latitude: user.lat, longitude: user.lng },
            { unit: "mile" }
          )
        );
        growrs.push(user);
      });

  return (
    <Tabs
      activeKey={key}
      onSelect={(k) => {
        setKey(k);
      }}
      className="all"
    >
      <Tab
        eventKey="listView"
        title={
          <span className="tabs">
            <FaListUl />
            <p>List</p>
          </span>
        }
      >
        <ListView growrs={growrs} />
      </Tab>
      <Tab
        eventKey="mapView"
        title={
          <span className="tabs">
            <FaMap />
            <p>Map</p>
          </span>
        }
      >
        <MapView growrs={growrs} />
      </Tab>
    </Tabs>
  );
}
