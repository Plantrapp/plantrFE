import "./App.css";
import RegisterLogin from "./pages/RegisterLogin";
import Dashboard from "./pages/Dashboard";
import { CurrentUserContext } from "./utils/contexts/Contexts";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import PrivateRoute from "./utils/authentication/PrivateRoute";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import { SocketProvider } from "./utils/contexts/SocketProvider";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showToast, setShowToast] = useState({
    login: false,
    updatePassword: false,
  });
  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="App">
      <SocketProvider>
        <CurrentUserContext.Provider
          value={{ currentUser, setCurrentUser, showToast, setShowToast }}
        >
          <div className="toaster">
            <Toast
              onClose={() => setShowToast({ ...showToast, login: false })}
              show={showToast.login}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="mr-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>Username or password was incorrect</Toast.Body>
            </Toast>
            <Toast
              onClose={() =>
                setShowToast({ ...showToast, updatePassword: false })
              }
              show={showToast.updatePassword}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="mr-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>Password was incorrect</Toast.Body>
            </Toast>
          </div>

          <Route exact path="/" component={RegisterLogin} />
          {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
          <Route path="/dashboard" component={Dashboard} />
        </CurrentUserContext.Provider>
      </SocketProvider>
    </div>
  );
}

export default App;
