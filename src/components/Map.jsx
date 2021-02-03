import React, {useState, useEffect} from 'react'
import {GoogleMap, useLoadScript, InfoWindow, Marker} from "@react-google-maps/api"
import MapLoader from "./MapLoader"
import axios from "axios"



const mapStyles = {
    width: "100%",
    height: "100%",
}

function Map(props){
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDb9UX7qQuz9mOWLyoBoWCPIZPXJdxl1pw"
    })
    if (loadError) return "Error loading"
    if (!isLoaded) return "Loading Maps"
    console.log("Hiiiii")
    return (
        // <>
        // </>
        <>
        {/* {props.markers ? 
        console.log("Here", props.markers) */}
        
        <GoogleMap mapContainerStyle={mapStyles} zoom={8} center={{lat: 36.1699, lng: -115.1398 }}>
            {props.markers && props.markers.map(marker => (
                <Marker key={marker.id} position={{lat:marker.lat, lng:marker.lng}}/>
            )
            )}
        </GoogleMap>
        {/* :<div>Loading...</div>}   */}
        </>
    )
}

// const WrappedMap = withScriptjs(withGoogleMap(Map))


export default Map

