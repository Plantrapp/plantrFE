import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import MapLoader from "./MapLoader";
import axios from "axios";
import geocoder from "react-geocode";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import profPic from "../../assets/img/user-profile.png";
import mapStyles from "./mapStyles";
import Styled from "styled-components";
import { UserContext, CurrentUserContext } from "../../utils/contexts/Contexts";
import { FaStar, FaFilter } from "react-icons/fa";
import haversine from "haversine";
import { Form } from "react-bootstrap";

const MapControlStyles = Styled.div`
    position: absolute;
    /* transform: translateX(-50%) */
    /* top: 1rem; */
    z-index: 1;
    right: 0;
    display: flex;
    flex-direction: column;
`;

const FitlerStyles = Styled.div`
background: white;
  .filter-form {
    display: flex;
  }
`;

const Wrapper = Styled.div`
  .checked {
    color: yellow;
  }
  .unchecked {
    color: #525151;
  }
`;

const mapContainerStyle = {
  width: "85vw",
  height: "95.5vh",
  position: "absolute",
};

const libraries = ["places"];

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function Map(props) {
  // const [markers, setMarkers] = useState([]);
  // const [counter, setCounter] = useState(0);
  const [selected, setSelected] = useState(null);
  const [starRating, setStarRating] = useState([]);

  const { growrs } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDb9UX7qQuz9mOWLyoBoWCPIZPXJdxl1pw",
    libraries,
  });
  // const distance = new window.google.maps.DistanceMatrixService();

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
  }, []);

  function toStarsArr(rating) {
    let starsArr = [];
    for (let i = 0; i < 5; i++) {
      starsArr.push(i < rating);
    }
    return starsArr;
  }

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/user")
  //     .then((res) => {
  //       let tempArr = [];
  //       tempArr = res.data.filter((user) => user.isGrowr > 0);
  //       setCounter(tempArr.length);

  //       tempArr.forEach((user) => {
  //         console.log(user);
  //         geocoder
  //           .fromAddress(
  //             `${user.street_address}, ${user.city}, ${user.state} ${user.zipcode}`
  //           )
  // .then((res) => {
  //   let lat = res.results[0].geometry.location.lat;
  //   let lng = res.results[0].geometry.location.lng;
  //             let newMarker = {
  //               lat,
  //               lng,
  //               time: Date.now(),
  //               fName: user.first_name,
  //               lName: user.last_name,
  //               rate: user.hourly_rate,
  //             };
  //             // tempArr.push(newMarker)
  //             setMarkers((oldMarkers) => [...oldMarkers, newMarker]);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       });
  //       //   users.forEach(user => {

  //       //       geocoder.fromAddress(  `${user.street_address}, ${user.city}, ${user.state} ${user.zipcode}`)
  //       //       .then(res => {
  //       //               let lat = res.results[0].geometry.location.lat
  //       //               let lng = res.results[0].geometry.location.lng
  //       //               let newMarker = {lat, lng, time: Date.now()}
  //       //               user.marker = newMarker
  //       //               // tempArr.push(newMarker)
  //       //               setMarkers(oldMarkers=> [
  //       //                   ...oldMarkers, newMarker
  //       //               ])
  //       //       })
  //       //       .catch(err => {
  //       //           console.log(err)
  //       //       })
  //       //   })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  if (loadError) return "Error loading";
  if (!isLoaded) return "Loading Maps";

  // console.log(growrs);

  return (
    // <>
    // </>
    <Wrapper>
      <MapControlStyles>
        <Search panTo={panTo} />
        <Locate panTo={panTo} />
        <Filters />
      </MapControlStyles>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={{ lat: 39.7617, lng: -99.1193 }}
        onLoad={onMapLoad}
        options={options}
      >
        {growrs.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: profPic,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
              setStarRating(toStarsArr(marker.star_rating));
            }}
          />
        ))}
        {currentUser && (
          <Marker
            key={currentUser.id}
            position={{ lat: currentUser.lat, lng: currentUser.lng }}
          />
        )}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
              mapRef.current.setZoom(5);
            }}
          >
            <div>
              <h2>{`${selected.first_name} ${selected.last_name}`}</h2>
              <p>Rate: ${selected.hourly_rate}/hr</p>
              <p>{selected.distance} miles away</p>
              <p>
                Rating:
                {starRating.map((star) => (
                  <FaStar className={star ? "checked" : "unchecked"} />
                ))}
              </p>
              <Link to={`/dashboard/growrProfile/${selected.username}`}>
                View Profile
              </Link>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      )
    </Wrapper>
  );
}

function Locate({ panTo }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) => alert(err)
        );
      }}
    >
      Current Location
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 39.7617, lng: () => -99.1193 },
      radius: 10 * 1000,
    },
  });
  return (
    <Combobox
      onSelect={(address) => {
        setValue(address, false);
        clearSuggestions();

        geocoder.fromAddress(address).then((res) => {
          let lat = res.results[0].geometry.location.lat;
          let lng = res.results[0].geometry.location.lng;

          panTo({ lat, lng });
        });
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
function Filters() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FitlerStyles>
      {isOpen ? (
        <Form className="filter-form">
          <Form.Group>
            <b>Distance</b>

            <Form.Check label="00-25 miles" />
            <Form.Check label="26-50 miles" />
            <Form.Check label="51-75 miles" />
          </Form.Group>
          <Form.Group>
            <b>Price</b>

            <Form.Check label="< $20" />
            <Form.Check label="$21-$40" />
            <Form.Check label="$41-$60" />
          </Form.Group>
          <Form.Group>
            <b>Rating</b>

            <Form.Check label={<FaStar size={10} />} />
            <Form.Check
              label={
                <>
                  <FaStar size={10} /> <FaStar size={10} />
                </>
              }
            />
            <Form.Check
              label={
                <>
                  <FaStar size={10} /> <FaStar size={10} /> <FaStar size={10} />
                </>
              }
            />
            <Form.Check
              label={
                <>
                  <FaStar size={10} /> <FaStar size={10} /> <FaStar size={10} />{" "}
                  <FaStar size={10} />{" "}
                </>
              }
            />
            <Form.Check
              label={
                <>
                  <FaStar size={10} /> <FaStar size={10} /> <FaStar size={10} />{" "}
                  <FaStar size={10} /> <FaStar size={10} />
                </>
              }
            />
          </Form.Group>
          <Form.Group>
            <b>Distance</b>

            <Form.Check label="0-50 miles" />
          </Form.Group>
          <p onClick={() => setIsOpen(false)}>Close Filters</p>
        </Form>
      ) : (
        <div onClick={() => setIsOpen(true)}>
          <FaFilter />
        </div>
      )}
    </FitlerStyles>
  );
}

export default Map;
