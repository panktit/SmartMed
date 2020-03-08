import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import DashboardNavbar from "../components/Navbars/DashboardNavbar.jsx";
import DashboardFooter from "../components/Footers/DashboardFooter.jsx";
import Sidebar from "../components/Sidebar/DoctorSidebar.jsx";
import PatientList from "../views/profile-sections/DoctorTableList.jsx";
import UserPage from "../views/profile-sections/DoctorUserpage.jsx";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "blue"
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} />
        <div className="main-panel" ref={this.mainPanel}>
          <DashboardNavbar {...this.props} />
          <Switch>
            {/* {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })} */}
            <Route path="/doctor/profile" render={props => <UserPage {...props} />} />
            <Route path="/doctor/view" render={props => <PatientList {...props} />} />
            <Redirect from="/doctor" to="/doctor/profile" />
          </Switch>
          <DashboardFooter fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;