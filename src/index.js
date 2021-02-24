import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CloudinaryContext } from "cloudinary-react";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <CloudinaryContext cloudName="plantr" uploadPreset="prof_pic">
    <Router>
      <App />
    </Router>
  </CloudinaryContext>,
  document.getElementById("root")
);
