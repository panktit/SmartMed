import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
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
import NotFound from "./components/NotFound.js";
import PatientUpload from "./components/Dashboard/PatientUpload.jsx";
import PatientRecordList from "./components/Dashboard/PatientTableList.jsx";
import PatientUserPage from "./components/Dashboard/PatientUserpage.jsx"
import PatientView from "./components/Dashboard/PatientView.jsx"
import DoctorUserPage from "./components/Dashboard/DoctorUserpage.jsx"
import PatientList from "./components/Dashboard/DoctorTableList.jsx";
import RecordList from "./components/Dashboard/RecordTableList.jsx";
import DoctorUpload from "./components/Dashboard/DoctorUpload.jsx";
import PermissionGrant from "./components/Dashboard/PermissionGrant.jsx";

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
      <Switch>
        <Route exact path="/" render={props => <Index {...props} />} />
        <Route path="/home/:id" render={props => <LoginIndex {...props} />} />
        <Route path="/login" render={props => <LoginPage {...props} />} />
        <Route path="/register" render={props => <SignupPage {...props} />} />
        <Route path="/patient/profile/:id" render={props => <PatientUserPage {...props} />} />
        <Route path="/patient/view/:id" render={props => <PatientRecordList {...props} />} />
        <Route path="/patient/upload/:id" render={props => <PatientUpload {...props} />} />
        <Route path="/patient/grant/:id" render={props => <PatientView {...props} />} />
        <Route path="/doctor/profile/:id" render={props => <DoctorUserPage {...props} />} />
        <Route path="/doctor/view/:id" render={props => <PatientList {...props} />} />
        <Route path="/record/view/:id" render={props => <RecordList {...props} />} />
        <Route path="/record/upload/:id" render={props => <DoctorUpload {...props} />} />
        <Route path="/permission/grant/:id" render={props => <PermissionGrant {...props} />} />
        <Route path="*" component={NotFound} />
      </Switch>*
    </Switch>
  </Router>,
  document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();