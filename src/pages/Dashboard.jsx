import React from "react";
import SideBar from "../components/SideBar";
import Searchbar from "../components/Searchbar";
import GrowrView from "../components/GrowrView";
import GrowrProfile from "../components/GrowrProfile";
import Settings from "../components/Settings";
import {Route} from "react-router-dom"



export default function Dashboard() {
  return (
    <>
      <SideBar />
      <div>
        <Searchbar />
        <Route path="/dashboard/settings" component={Settings} />
        <Route path="/dashboard/growrProfile" component={GrowrProfile}/>
        <Route exact path="/dashboard" component={GrowrView} />
      </div>
    </>
  );
}
