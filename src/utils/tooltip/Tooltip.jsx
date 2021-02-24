import React from "react";

export default function Tooltip(props) {
  switch (props.id) {
    case "locate":
      return <div>Find my current location</div>;
    case "filter":
      return <div>Open Filters</div>;

    default:
      break;
  }
  return <div></div>;
}
