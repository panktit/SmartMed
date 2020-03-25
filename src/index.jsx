import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';

// styles for this kit

import "./assets/css/bootstrap.min.css";
import "./assets/css/demo.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/scss/now-ui-dashboard.scss?v1.2.0";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import * as serviceWorker from "./registerServiceWorker";

// pages for this kit
import Index from "./components/Index.js";
import LoginIndex from "./components/LoginIndex.js";
import LoginPage from "./components/Login.js";
import SignupPage from "./components/Signup.js";
import DoctorLayout from "./components/Doctor.jsx";
import PatientLayout from "./components/Patient.jsx";
import RecordLayout from "./components/Record.jsx";
// import DoctorProfile from "views/examples/DoctorProfile.js";

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Switch>
        <Route path="/index" render={props => <Index {...props} />} />
        <Route path="/home/:id" render={props => <LoginIndex {...props} />} />
        <Route path="/login" render={props => <LoginPage {...props} />} />
        <Route path="/register" render={props => <SignupPage {...props} />} />
        {/* <Route path="/doctor" render={props => <DoctorProfile {...props} />} /> */}
        <Route path="/doctor" render={props => <DoctorLayout {...props} />} />
        <Route path="/patient" render={props => <PatientLayout {...props} />} />
        <Route path="/record" render={props => <RecordLayout {...props} />} />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>*
    </Switch>
  </Router>,
  document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();