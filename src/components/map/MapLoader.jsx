import React, { useState, useEffect } from "react";
import geocoder from "react-geocode";
import Map from "./Map";

import { axiosWithAuth } from "../../utils/authentication/AxiosWithAuth";

export default function MapLoader() {
  const [markers, setMarkers] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axiosWithAuth()
      .get(`/user`)
      .then((res) => {
        setCounter(res.data.length);
        res.data.forEach((user) => {
          geocoder
            .fromAddress(
              `${user.street_address}, ${user.city}, ${user.state} ${user.zipcode}`
            )
            .then((res) => {
              let lat = res.results[0].geometry.location.lat;
              let lng = res.results[0].geometry.location.lng;
              let newMarker = { lat, lng, id: Date.now() };
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
  return (
    <>
      {markers.length === counter ? (
        <Map markers={markers}></Map>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
