import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../assets/img/tsmfavicon.png";

var ps;
let doctorId = "";
let patientId = "";
let encKey = "";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    console.log("Record Sidebar props: ", this.props);
    doctorId = this.props.match.params.id;
    patientId = this.props.location.state.pid;
    encKey = this.props.location.state.encKey;
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color="blue">
        <div className="logo">
          <a
            href="/"
            className="simple-text logo-mini"
            target="_blank"
          >
            <div className="logo-img">
              <img src={logo} alt="smartmed-logo" />
            </div>
          </a>
          <a
            href="/"
            className="simple-text logo-normal"
            target="_blank"
          >
            SmartMed
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
            <Nav>
                <li
                  className={
                    this.activeRoute("/record/view")}
                >
                  <NavLink {...this.props}
                    to ={{
                        pathname: `/record/view/`+doctorId,
                        state: { 
                          pid: patientId, 
                          encKey: encKey,
                        }
                    }}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="now-ui-icons files_paper" />
                    <p>View Records</p>
                  </NavLink>
                </li>

                <li
                  className={
                    this.activeRoute("/record/upload")}
                >
                  <NavLink {...this.props}
                    to ={{
                        pathname: `/record/upload/`+doctorId,
                        state: { 
                          pid: patientId,
                          encKey: encKey,
                        }
                    }}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="now-ui-icons arrows-1_cloud-upload-94" />
                    <p>Upload New Record</p>
                  </NavLink>
                </li>

                <li
                  className={
                    this.activeRoute("/doctor/view")}
                >
                  <NavLink {...this.props}
                    to={'/doctor/view/'+doctorId}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className="now-ui-icons arrows-1_minimal-left" />
                    <p>Back to Patient List</p>
                  </NavLink>
                </li>
            </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;