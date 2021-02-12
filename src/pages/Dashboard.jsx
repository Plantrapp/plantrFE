import React from "react";
import { Route } from "react-router-dom";
import {
  SideBar,
  GrowrView,
  GrowrProfile,
  Settings,
  Map,
  Messages,
  Conversation,
} from "../components";

export default function Dashboard() {
  return (
    <>
      <SideBar />
      <div>
        <Route exact path="/dashboard" component={GrowrView} />
        <Route path="/dashboard/messages" component={Messages} />
        <Route path="/dashboard/conversation" component={Conversation} />
        <Route path="/dashboard/settings" component={Settings} />
        <Route path="/dashboard/map" component={Map} />
        <Route path="/dashboard/growrProfile" component={GrowrProfile} />
      </div>
    </>
  );
}
