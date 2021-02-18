import "./App.css";
import RegisterLogin from "./pages/RegisterLogin";
import Dashboard from "./pages/Dashboard";
import { CurrentUserContext } from "./utils/contexts/Contexts";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import PrivateRoute from "./utils/authentication/PrivateRoute";
import axios from "axios";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div className="App">
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Route exact path="/" component={RegisterLogin} />
        {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        <Route path="/dashboard" component={Dashboard} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
