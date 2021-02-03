import React, {useState, useEffect} from "react";
import SideBar from "../components/SideBar";
import Searchbar from "../components/Searchbar";
import GrowrView from "../components/GrowrView";
import GrowrProfile from "../components/GrowrProfile";
import Settings from "../components/Settings";
import {Route} from "react-router-dom"
import Map from "../components/Map";
import MapLoader from "../components/MapLoader"
import axios from "axios"
import {Marker} from "react-google-maps"



export default function Dashboard() {
  

  return (
    <>
      <SideBar />
      <div>
        <Searchbar />
        <Route path="/dashboard/settings" component={Settings} />
        <Route path="/dashboard/growrProfile" component={GrowrProfile}/>
        {/* <Route path="/dashboard/map" component={Map}/> */}
        <div style={{width: "100vw", height:"100vh"}}>
        <Route path="/dashboard/map">

        <MapLoader />
        {/* <Map googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDb9UX7qQuz9mOWLyoBoWCPIZPXJdxl1pw" 
        loadingElement={<div style={{height: "100%"}}/>}
        containerElement={<div style={{height: "100%"}}/>}
        mapElement={<div style={{height: "100%"}}/>}
        
        
        /> */}
        
        </Route>
        </div>
        <Route exact path="/dashboard" component={GrowrView} />

      </div>
    </>
  );
}
