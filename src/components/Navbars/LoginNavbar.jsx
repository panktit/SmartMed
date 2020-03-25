import React from "react";
import { NavLink, Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  // NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

function LoginNavbar(props) {
  console.log("Login Navbar props: ",props);
  const [user] = React.useState(props.location.state);
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  console.log("User in Login Navbar: ", user);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              id="navbar-brand"
            >
              SmartMed
            </NavbarBrand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar style={{marginTop: "5px"}}>
              <NavItem>
                <NavLink
                  style={{margin: "5px 15px", display: "block"}}
                  to="#pablo"
                  // onClick={e => {
                  //   e.preventDefault();
                  //   document
                  //     .getElementById("download-section")
                  //     .scrollIntoView();
                  // }}
                >
                  <i className="now-ui-icons travel_info" style={{margin: "5px", fontSize: "15px", verticalAlign: "middle"}}></i>
                  <p style={{fontSize: "10px", verticalAlign: "middle"}}>ABOUT US</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink {...props}
                  style={{margin: "5px 15px", display: "block"}}
                  to={{
                  pathname: `/`+user.userType+`/profile/`+user._id, 
                  state: { 
                    _id: user._id, 
                    userType: user.userType,
                  }
                }} 
                >
                <i className="now-ui-icons business_badge" style={{margin: "5px", fontSize: "15px", verticalAlign: "middle"}}></i>
                <p style={{fontSize: "10px", verticalAlign: "middle"}}>DASHBOARD</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{margin: "5px 15px", display: "block"}}
                  to="#pablo"
                  // onClick={e => {
                  //   e.preventDefault();
                  //   document
                  //     .getElementById("download-section")
                  //     .scrollIntoView();
                  // }}
                >
                  <i className="now-ui-icons objects_globe" style={{margin: "5px", fontSize: "15px", verticalAlign: "middle"}}></i>
                  <p style={{fontSize: "10px", verticalAlign: "middle"}}>CONTACT US</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  size="sm"
                  style={{marginTop:"-3px", marginLeft: "10px", marginRight: "5px"}}
                  to="/"
                  id="logout"
                  tag={Link}
                >
                  <p>Logout</p>
                </Button>
              </NavItem>
              {/* <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  size="sm"
                  style={{marginTop:"2px"}}
                  to="/register"
                  id="register"
                  tag={Link}
                >
                  <p>Register</p>
                </Button>
              </NavItem> */}
              <NavItem>
                <NavLink
                  style={{margin: "5px 12px", display: "block"}}
                  to="#"
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter" style={{margin: "5px", fontSize: "18px"}}></i>
                  <p className="d-lg-none d-xl-none" style={{fontSize: "10px", verticalAlign: "middle"}}>TWITTER</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{margin: "5px 12px",  display: "block"}}
                  to="#"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square" style={{margin: "5px", fontSize: "18px"}}></i>
                  <p className="d-lg-none d-xl-none" style={{fontSize: "10px", verticalAlign: "middle"}}>FACEBOOK</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{margin: "5px 12px",  display: "block"}}
                  to="#"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram" style={{margin: "5px", fontSize: "18px"}}></i>
                  <p className="d-lg-none d-xl-none" style={{fontSize: "10px", verticalAlign: "middle"}}>INSTAGRAM</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default LoginNavbar;