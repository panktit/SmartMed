import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch } from "react-router-dom";

// core components
import DashboardNavbar from "./Navbars/DashboardNavbar.jsx";
import DashboardFooter from "./Footers/DashboardFooter.jsx";
import Sidebar from "./Sidebar/DoctorSidebar.jsx";
import PatientList from "./Dashboard/DoctorTableList.jsx";
import UserPage from "./Dashboard/DoctorUserpage.jsx";

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  mainPanel = React.createRef();
  componentDidMount() {
    console.log("Props in Doctor Layout did mount: ", this.props.location.state);
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
            <Route path="/doctor/profile/:id" render={props => <UserPage {...props} />} />
            <Route path="/doctor/view/:id" render={props => <PatientList {...props} />} />
            {/* <Redirect from="/doctor" to="/doctor/profile" /> */}
          </Switch>
          <DashboardFooter fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;