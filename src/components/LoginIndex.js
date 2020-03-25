import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

import LoginNavbar from "./Navbars/LoginNavbar.jsx";
import IndexHeader from "./Headers/IndexHeader.js";
import DarkFooter from "./Footers/DarkFooter.js";

// sections for this page
import Typography from "./Typography.js";

function Index(props) {
  console.log("Login Index Props: ",props);
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <LoginNavbar {...props}/>
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          {/* <BasicElements />
          <Navbars />
          <Tabs />
          <Pagination />
          <Notifications /> */}
          <Typography {...props} />
          {/* <Javascript />
          <Carousel />
          <NucleoIcons />
          <CompleteExamples />
          <SignUp />
          <Examples />
          <Download /> */}
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
