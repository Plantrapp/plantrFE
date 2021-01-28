import React from "react";
import SideBar from "../components/SideBar";
import Searchbar from "../components/Searchbar";
import GrowrView from "../components/GrowrView";
import GrowrProfile from "../components/GrowrProfile";
export default function Dashboard() {
  return (
    <>
      <SideBar />
      <div>
        <Searchbar />
        {/* <GrowrView /> */}
        <GrowrProfile />
      </div>
    </>
  );
}
