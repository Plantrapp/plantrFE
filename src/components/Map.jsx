import React, {useState, useEffect, useRef, useCallback} from 'react'
import {GoogleMap, useLoadScript, InfoWindow, Marker} from "@react-google-maps/api"
import MapLoader from "./MapLoader"
import axios from "axios"
import geocoder from "react-geocode"
import usePlacesAutocomplete from "use-places-autocomplete"
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox"
import "@reach/combobox/styles.css"
import profPic from "../assets/img/user-profile.png"
import mapStyles from "./mapStyles"
import Styled from "styled-components"

const MapControlStyles = Styled.div`
    position: absolute;
    /* transform: translateX(-50%) */
    /* top: 1rem; */
    z-index: 1;
    right: 0;
    display: flex;
    flex-direction: column;
`




const mapContainerStyle = {
    width: "100%",
    height: "90vh",
}

const libraries = ["places"]

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true

}

function Map(props){
    const [markers, setMarkers] = useState([])
    const [counter, setCounter] = useState(0)
    const [selected, setSelected] = useState(null)
    const [users, setUsers] = useState([])
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDb9UX7qQuz9mOWLyoBoWCPIZPXJdxl1pw",
        libraries
    })

    const mapRef = useRef()

    const onMapLoad = useCallback(map => {
        mapRef.current = map
    }, [])

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng})
        mapRef.current.setZoom(10)
    }, [])




    useEffect(() => {
      axios.get("http://localhost:5000/user")
          .then(res => {
              let tempArr = []
              tempArr = res.data.filter(user => user.isGrowr > 0)
              setCounter(tempArr.length)
              
              tempArr.forEach(user => {
                    console.log(user)
                    geocoder.fromAddress(  `${user.street_address}, ${user.city}, ${user.state} ${user.zipcode}`)
                    .then(res => {
                          let lat = res.results[0].geometry.location.lat
                          let lng = res.results[0].geometry.location.lng
                          let newMarker = {lat, lng, time: Date.now(), fName: user.first_name, lName: user.last_name, rate: user.hourly_rate}
                          // tempArr.push(newMarker)
                          setMarkers(oldMarkers=> [
                              ...oldMarkers, newMarker
                          ])
                  })
                  .catch(err => {
                      console.log(err)
                  })
              })
            //   users.forEach(user => {
  
            //       geocoder.fromAddress(  `${user.street_address}, ${user.city}, ${user.state} ${user.zipcode}`)
            //       .then(res => {
            //               let lat = res.results[0].geometry.location.lat
            //               let lng = res.results[0].geometry.location.lng
            //               let newMarker = {lat, lng, time: Date.now()}
            //               user.marker = newMarker
            //               // tempArr.push(newMarker)
            //               setMarkers(oldMarkers=> [
            //                   ...oldMarkers, newMarker
            //               ])
            //       })
            //       .catch(err => {
            //           console.log(err)
            //       })
            //   })
                  
              
  
          })
          .catch(err => {
              console.log(err)
          })
    }, [])
    if (loadError) return "Error loading";
    if (!isLoaded) return ("Loading Maps")

    console.log(markers)

    return (
        // <>
        // </>
        <>
        <MapControlStyles>

        <Search panTo={panTo}/>
        <Locate panTo={panTo}/>
        </MapControlStyles>
        {markers.length === counter ? 
        
        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={5} 
        center={{lat: 39.7617, lng: -99.1193 }} 
        onLoad={onMapLoad} 
        options={options} 
        >
            {markers && markers.map(marker => (
                <Marker 
                key={marker.time} 
                position={{lat:marker.lat, lng:marker.lng}} 
                icon={{
                    url: profPic,
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15,15)


                }}
                onClick={() => {
                    setSelected(marker)
                }}
                />
            )
            )}
            {selected ? <InfoWindow position={{lat: selected.lat, lng:selected.lng}} onCloseClick={() => {
                setSelected(null)
                mapRef.current.setZoom(5)
            }}>
                <div>
            <h2>{`${selected.fName} ${selected.lName}`}</h2>
            <p>Rate: ${selected.rate}/hr</p>
                </div>
            </InfoWindow>: null}
        </GoogleMap>
         :<div>Loading...</div>}
        </>
    )
}


function Locate({panTo}) {
    return <button onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, (err)=> alert(err))
    }}>Current Location</button>
}

function Search ({panTo}) {
    const {
        ready, 
        value, 
        suggestions:{status, data}, 
        setValue, 
        clearSuggestions 
    } = usePlacesAutocomplete(
        {
        requestOptions: {
            location: {lat: () =>  39.7617, lng: () => -99.1193 },
            radius: 10 * 1000,
        }
    }
    )
    return (
        

    <Combobox onSelect={(address) => {
        setValue(address, false)
        clearSuggestions()
        
        geocoder.fromAddress(address)
        .then(res => {
            let lat = res.results[0].geometry.location.lat
            let lng = res.results[0].geometry.location.lng
            
            panTo({lat, lng})
        })
        
        
    }}>
        <ComboboxInput 
        value={value} 
        onChange={(e) =>{
            setValue(e.target.value)
        }}
        disabled={!ready}
        placeholder="Enter an address"
        />
        <ComboboxPopover>
            <ComboboxList>

            {status === "OK" && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description} />)}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>

    )
}


export default Map

