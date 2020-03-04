import React from "react";
import { Link } from "react-router-dom";
const tasks = [
  {
    checked: true,
    text: 'Sign contract for "What are conference organizers afraid of?"'
  },
  {
    checked: false,
    text: "Lines From Great Russian Literature? Or E-mails From My Boss?"
  },
  {
    checked: true,
    text:
      "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"
  }
];

// ##############################
// // // table head data and table body data for Tables view
// #############################

const thead = ["First Name", "Last Name", "Age" , "Blood Group", ""];
const tbody = [
  {
    className: "table-success",
    data: ["Dakota", "Rice", "27", "B+", <Link to="/patient/view" style={{ color: '#007bff' }} className="nav-link"><i className="now-ui-icons files_paper"/></Link>]
  },
  {
    className: "",
    data: ["Minerva", "Hooper", "34", "O+", <Link to="/patient/view" style={{ color: '#007bff' }} className="nav-link"><i className="now-ui-icons files_paper"/></Link>]
  },
  {
    className: "table-info",
    data: ["Sage", "Rodriguez", "38", "AB+", <Link to="/patient/view" style={{ color: '#007bff' }} className="nav-link"><i className="now-ui-icons files_paper"/></Link>]
  },
  {
    className: "",
    data: ["Philip", "Chaney", "42", "A-", <Link to="/patient/view" style={{ color: '#007bff' }} className="nav-link"><i className="now-ui-icons files_paper"/></Link>]
  },
  {
    className: "table-danger",
    data: ["Doris", "Greene", "32", "B+",<Link to="/patient/view" style={{ color: '#007bff' }} className="nav-link"><i className="now-ui-icons files_paper"/></Link>]
  },
  { className: "", data: ["Mason", "Porter", "45", "AB+",<Link to="/patient/view" style={{ color: '#007bff' }} className="nav-link"><i className="now-ui-icons files_paper"/></Link>] },
  {
    className: "table-warning",
    data: ["Jon", "Porter", "68", "O+",<Link to="/patient/view" style={{ color: '#007bff' }} className="nav-link"><i className="now-ui-icons files_paper"/></Link>]
  }
];

// tasks list for Tasks card in Dashboard view
// data for <thead> of table in TableList view
// data for <tbody> of table in TableList view
export { tasks, thead, tbody };
