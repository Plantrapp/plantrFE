import React, { useState } from "react";

export default function Hover(props) {
  const [hovering, setHovering] = useState(false);

  const mouseOver = () => setHovering(true);
  const mouseOut = () => setHovering(false);

  return (
    <div onMouseOut={mouseOut} onMouseOver={mouseOver}>
      {props.children(hovering)}
    </div>
  );
}
