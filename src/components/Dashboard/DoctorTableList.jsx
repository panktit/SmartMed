import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../PanelHeader.jsx";
import Sidebar from "../Sidebar/DoctorSidebar";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardFooter from "../Footers/DashboardFooter";

let doctorId = "";

class DoctorTableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patientList: [{ }]
    }
  }

  componentDidMount() {
    console.log("Doctor Table list props: ", this.props);
    doctorId = this.props.match.params.id;
    axios.get('http://localhost:4000/api/user/patients')
      .then(res => {
        this.setState({ patientList: res.data });
    });
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar {...this.props} />
          <div className="main-panel" ref={this.mainPanel}>
            <DashboardNavbar {...this.props} />
            <PanelHeader size="sm" />
            <div className="content">
              <Row>
                <Col xs={12}>
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Patient List</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Blood Group</th>
                            <th>Records</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.patientList.map(patient =>
                            <tr>
                              <td>{patient.first_name}</td>
                              <td>{patient.last_name}</td>
                              <td>{patient.age}</td>
                              <td>{patient.blood_group}</td>
                              <td><Link to ={{
                                pathname: `/record/view/`+doctorId,
                                state: { 
                                  pid: patient._id, 
                                }
                              }} style={{ color: '#007bff' }} className="nav-link">View</Link></td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            <DashboardFooter fluid />
          </div>
        </div>
      </>
    );
  }
}

export default DoctorTableList;
