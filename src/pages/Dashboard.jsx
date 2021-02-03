import React from "react";
import SideBar from "../components/SideBar";
import Searchbar from "../components/Searchbar";
import GrowrView from "../components/GrowrView";
import GrowrProfile from "../components/GrowrProfile";
import Settings from "../components/Settings";
import { Route } from "react-router-dom";
import MapLoader from "../components/MapLoader";
import Messages from "../components/Messages";
import Conversation from "../components/Conversation";

export default function Dashboard() {
  return (
    <>
      <SideBar />
      <div>
        <Searchbar />
        <Route exact path="/dashboard" component={GrowrView} />
        <Route path="/dashboard/messages" component={Messages} />
        <Route path="/dashboard/conversation" component={Conversation} />
        <Route path="/dashboard/settings" component={Settings} />
        <Route path="/dashboard/map" component={MapLoader} />
        <Route path="/dashboard/growrProfile" component={GrowrProfile} />
      </div>
    </>
  );
}
