import React from 'react';

const NotFound = () =>
  <div style={{"padding": "40px 15px", "text-align": "center"}}>
    <img alt="..." src={require("../assets/img/tsmfavicon.png")}></img>
    <h3>SmartMed</h3>
    <h1>Oops!</h1>
    <h2>404 Not Found</h2>
    <p>Sorry, an error has occured. Requested page not found!</p>
    <br/><br/>
    <a href="/">Back to Home</a>
  </div>
  
export default NotFound;