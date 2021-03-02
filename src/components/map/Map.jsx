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
import { FaStar, FaFilter, FaCompass } from "react-icons/fa";
import haversine from "haversine";
import { Form } from "react-bootstrap";
import Tooltip from "../../utils/tooltip/Tooltip";
import Hover from "../../utils/tooltip/Hover";

const MapControlStyles = Styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    /* flex-direction: column; */
    /* border: 1px solid black; */
    padding: 1%;
    width: 85%;
    justify-content: space-between;
`;

const FitlerStyles = Styled.div`
padding: 1%;
width: 50%;
text-align: center;
background: white;
  .filter-form {
    display: flex;
    justify-content: space-between;
    .group {
      display: flex;
      flex-direction: column; 
      align-items: baseline;
      border: 1px solid black;
      margin: 1%;
      .filter-title {
         align-self: center;
      }
    }
  }
`;

const SearchStyles = Styled.div`
width: 30%;
/* border: 1px solid black; */
[data-reach-combobox-input] {
  width: 100%;
}
[data-reach-combobox-input]:focus {
  outline: none;
}
[data-reach-combobox-input]::placeholder {
  color: gray;
}
[data-reach-combobox-list] {
  z-index: 2;
  position: absolute;
}
`;

const Wrapper = Styled.div`
  .checked {
    color: yellow;
  }
  .unchecked {
    color: #525151;
  }
  .marker {
    border: none;
  }
  .marker:focus {
    outline: none;
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
  const { growrs } = props;
  const [selected, setSelected] = useState(null);
  const [starRating, setStarRating] = useState([]);
  const [markers, setMarkers] = useState([]);

  const { currentUser } = useContext(CurrentUserContext);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDb9UX7qQuz9mOWLyoBoWCPIZPXJdxl1pw",
    libraries,
  });

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
      starsArr.push({ id: i, filled: i < rating });
    }
    return starsArr;
  }
  useEffect(() => {
    setMarkers(growrs);
  }, [growrs]);
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
        <Hover>
          {(hovering) => <Locate hovering={hovering} panTo={panTo} />}
          {/* <Locate panTo={panTo} /> */}
        </Hover>
        <Search panTo={panTo} />
        <Hover>
          {(hovering) => (
            <Filters
              markers={markers}
              setMarkers={setMarkers}
              growrs={growrs}
              setSelected={setSelected}
              hovering={hovering}
            />
          )}
        </Hover>
      </MapControlStyles>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={{ lat: currentUser.lat, lng: currentUser.lng }}
        onLoad={onMapLoad}
        options={options}
      >
        {markers.length > 0 &&
          markers.map((marker) => (
            <Marker
              className="marker"
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
            icon={{
              url: currentUser.profile_picture,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
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
                  <FaStar
                    key={star.id}
                    className={star.filled ? "checked" : "unchecked"}
                  />
                ))}
              </p>
              <div>
                <Link to={`/dashboard/growrProfile/${selected.username}`}>
                  View Profile
                </Link>
                <a
                  target="_blank"
                  href={`https://maps.google.com/?q=${selected.lat},${selected.lng}`}
                >
                  Get Directions
                </a>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      )
    </Wrapper>
  );
}

function Locate({ panTo, hovering }) {
  return (
    <div>
      <FaCompass
        size={"10%"}
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
      />
      {hovering ? <Tooltip id="locate" /> : null}
    </div>
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
    <SearchStyles>
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
    </SearchStyles>
  );
}

const initialFilterValues = {
  minDistance: "",
  maxDistance: "",
  minPrice: "",
  maxPrice: "",
  stars: 0,
};

function Filters({ setMarkers, growrs, setSelected, hovering }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState(initialFilterValues);
  const [selectedStarRating, setSelectedStarRating] = useState(null);
  console.log(selectedStarRating);

  function handleChange(e) {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  }

  function handleApply() {
    const minD = filterValues.minDistance || 0;
    const maxD = filterValues.maxDistance || 5000;
    const minP = filterValues.minPrice || 0;
    const maxP = filterValues.maxPrice || 5000;
    setMarkers(
      growrs.filter(
        (growr) =>
          growr.distance >= minD &&
          growr.distance <= maxD &&
          growr.hourly_rate >= minP &&
          growr.hourly_rate <= maxP &&
          growr.star_rating >= filterValues.stars &&
          growr.star_rating <= 5
      )
    );

    setSelected(null);
    setIsOpen(false);
  }

  function handleReset() {
    setMarkers(growrs);
    setFilterValues(initialFilterValues);
    setSelectedStarRating(null);
    setSelected(null);
  }
  // function handleUnchecks(min, max, filed){

  // }

  return (
    <>
      {isOpen ? (
        <FitlerStyles>
          <Form className="filter-form">
            <Form.Group className="group">
              <b className="filter-title">Distance</b>
              <Form.Control
                placeholder="Min (miles)"
                value={filterValues.minDistance}
                name="minDistance"
                onChange={handleChange}
              />
              <Form.Control
                placeholder="Max (miles)"
                value={filterValues.maxDistance}
                name="maxDistance"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="group">
              <b className="filter-title">Price</b>
              <Form.Control
                placeholder="$ Min (USD)"
                value={filterValues.minPrice}
                name="minPrice"
                onChange={handleChange}
              />
              <Form.Control
                placeholder="$ Max (USD)"
                value={filterValues.maxPrice}
                name="maxPrice"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="group">
              <b className="filter-title">Rating</b>

              <Form.Check
                checked={selectedStarRating === "1"}
                onChange={(e) => {
                  setSelectedStarRating(e.target.value);
                  handleChange(e);
                }}
                name="stars"
                value={1}
                label={<FaStar size={10} />}
                // onChange={() => handleChecks(0, 5, "star_rating")}
              />
              <Form.Check
                checked={selectedStarRating === "2"}
                onChange={(e) => {
                  setSelectedStarRating(e.target.value);
                  handleChange(e);
                }}
                name="stars"
                value={2}
                label={
                  <>
                    <FaStar size={10} /> <FaStar size={10} />
                  </>
                }
                // onChange={() => handleChecks(1, 5, "star_rating")}
              />
              <Form.Check
                checked={selectedStarRating === "3"}
                onChange={(e) => {
                  setSelectedStarRating(e.target.value);
                  handleChange(e);
                }}
                name="stars"
                value={3}
                label={
                  <>
                    <FaStar size={10} /> <FaStar size={10} />{" "}
                    <FaStar size={10} />
                  </>
                }
                // onChange={() => handleChecks(2, 5, "star_rating")}
              />
              <Form.Check
                checked={selectedStarRating === "4"}
                onChange={(e) => {
                  setSelectedStarRating(e.target.value);
                  handleChange(e);
                }}
                name="stars"
                value={4}
                label={
                  <>
                    <FaStar size={10} /> <FaStar size={10} />{" "}
                    <FaStar size={10} /> <FaStar size={10} />{" "}
                  </>
                }
                // onChange={() => handleChecks(3, 5, "star_rating")}
              />
              <Form.Check
                checked={selectedStarRating === "5"}
                onChange={(e) => {
                  setSelectedStarRating(e.target.value);
                  handleChange(e);
                }}
                name="stars"
                value={5}
                label={
                  <>
                    <FaStar size={10} /> <FaStar size={10} />{" "}
                    <FaStar size={10} /> <FaStar size={10} />{" "}
                    <FaStar size={10} />
                  </>
                }
                // onChange={() => handleChecks(4, 5, "star_rating")}
              />
            </Form.Group>
            {/* <Form.Group>
            <b>Distance</b>

            <Form.Check label="0-50 miles" />
          </Form.Group> */}
            <Form.Group>
              <p onClick={handleApply}>Apply Filters</p>
              <p onClick={handleReset}>Reset Filters</p>
              <p onClick={() => setIsOpen(false)}>Close Filters</p>
            </Form.Group>
          </Form>
        </FitlerStyles>
      ) : (
        <div>
          <FaFilter onClick={() => setIsOpen(true)} size={"10%"} />
          {hovering ? <Tooltip id="filter" /> : null}
        </div>
      )}
    </>
  );
}

export default Map;
