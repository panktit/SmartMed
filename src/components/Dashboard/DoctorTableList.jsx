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
let doctor = {};
class DoctorTableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patientList: [],
      doctor: {}
    }
  }

  componentDidMount() {
    // set initial list as blank
    let patientList = [];
    console.log("Doctor Table list props: ", this.props);
    doctorId = this.props.match.params.id;
    axios.get('http://localhost:4000/api/user/patients')
      .then(res => {
          this.setState({patientList : res.data});
      })
    console.log("Doctor List: ", this.state.patientList);
    axios.get('http://localhost:4000/api/user/'+doctorId)
    .then(res => {
        doctor = res.data;
        this.setState({doctor: res.data});
      })
    console.log("Doctor in doctor table list: ", this.state.doctor);
  }
  getData = id => {
    if(JSON.stringify(doctor) === '{}')
      return (<p>Loading...</p>);
    else {
      const pid = obj => obj.pid === id;
      if(doctor.acl.some(pid)) {
        var result = doctor.acl.filter(obj => {
          return obj.pid === id
        })
        console.log("Result: ",result[0]);
        return (<Link to ={{
          pathname: `/record/view/`+doctorId,
          state: { 
            pid: id,
            encKey: result[0].encKey
          }
        }} style={{ color: '#007bff' }} className="nav-link">View</Link>);
      }
      else
        return (<p style={{ color: '#f01a1a', fontWeight: 'bold' }}>  Access Restricted</p>);
    }
  }
  render() {
    console.log("Doctor in doctor table list: ", typeof this.state.doctor.acl);
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
                              <td>{this.getData(patient._id)}</td>
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
