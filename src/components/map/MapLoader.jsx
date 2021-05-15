import React, { useState, useEffect } from "react";
import geocoder from "react-geocode";
import Map from "./Map";

import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

export default function MapLoader() {
  const [markers, setMarkers] = useState([]);
  const [counter, setCounter] = useState(0);

  //   let geocoder = new window.google.maps.Geocoder()
  // console.log(window.google)

  useEffect(() => {
    axiosWithAuth()
      .get(`/user`)
      .then((res) => {
        setCounter(res.data.length);
        // const tempArr = []
        // setUsers(res.data)
        res.data.forEach((user) => {
          geocoder
            .fromAddress(
              `${user.street_address}, ${user.city}, ${user.state} ${user.zipcode}`
            )
            .then((res) => {
              let lat = res.results[0].geometry.location.lat;
              let lng = res.results[0].geometry.location.lng;
              let newMarker = { lat, lng, id: Date.now() };
              // tempArr.push(newMarker)
              setMarkers((oldMarkers) => [...oldMarkers, newMarker]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(markers, counter);
  return (
    <>
      {markers.length === counter ? (
        <Map
          //  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDb9UX7qQuz9mOWLyoBoWCPIZPXJdxl1pw"
          // loadingElement={<div style={{height: "100%"}}/>}
          // containerElement={<div style={{height: "100%"}}/>}
          // mapElement={<div style={{height: "100%"}}/>}
          markers={markers}
        >
          {/* {markers.map(marker => {
                <Marker key={marker.time} position={{lat: marker.lat, lng:marker.lng}}/>
            })} */}
        </Map>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
