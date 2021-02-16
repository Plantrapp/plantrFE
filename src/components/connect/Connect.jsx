import React, { useState } from "react";
import ListView from "./GrowrView";
import MapView from "../map/Map";
import { Tabs, Tab } from "react-bootstrap";
import { FaMap, FaListUl } from "react-icons/fa";
import styled from "styled-components";

export default function Connect() {
  const [key, setKey] = useState("listView");

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab
        eventKey="listView"
        title={
          <span className="tabs">
            <FaListUl />
            <p>List</p>
          </span>
        }
      >
        <ListView />
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
        <MapView />
      </Tab>
    </Tabs>
  );
}
