import "./App.css";
import RegisterLogin from "./pages/RegisterLogin";
import Dashboard from "./pages/Dashboard";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div className="App">
      <Route exact path="/" component={RegisterLogin} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  );
}

export default App;
