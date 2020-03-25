import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "./Navbars/IndexNavbar.js";
import IndexHeader from "./Headers/IndexHeader.js";
import DarkFooter from "./Footers/DarkFooter.js";

// sections for this page
import Typography from "./Typography.js";

function Index(props) {
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
      <IndexNavbar {...props} />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          {/* <BasicElements />
          <Navbars />
          <Tabs />
          <Pagination />
          <Notifications /> */}
          <Typography />
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
