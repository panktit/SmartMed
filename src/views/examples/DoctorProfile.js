// NOT USED

import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/now-ui-dashboard.scss?v1.2.0";
import "assets/css/demo.css";

import DoctorLayout from "layouts/Doctor.jsx";

function DoctorProfile() {
    const hist = createBrowserHistory();
    return (
        <>
            <Router history={hist}>
                <Switch>
                <Route path="/doctor" render={props => <DoctorLayout {...props} />} />
                {/* <Redirect to="/index" />
                <Redirect from="/doctor" to="/index" /> */}
                </Switch>
            </Router>
        </>

    );
}

export default DoctorProfile;