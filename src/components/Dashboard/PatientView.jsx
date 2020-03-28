import React from "react";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Button,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../PanelHeader.jsx";
import Sidebar from "../Sidebar/PatientSidebar";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardFooter from "../Footers/DashboardFooter";

let patientId = "";
let patient = {};

class PatientView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      doctorList: [],
      patient: {}
    }
    console.log("Patient View props: ", this.props);
    patientId = this.props.match.params.id;
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/user/doctors')
      .then(res => {
          this.setState({doctorList : res.data});
      })
      console.log("Doctor List: ", this.state.doctorList);
    
    // get patient details
    axios.get('http://localhost:4000/api/user/'+patientId)
    .then(res => {
        patient = res.data;
        this.setState({patient : res.data});
      })
  }

  handleClick = doctor => {
    if(patient.acl.includes(doctor._id)) {
      if(window.confirm("Are you sure you want to revoke access from "+doctor.first_name+ " "+ doctor.last_name+"?")) {
        // make changes
        patient.acl.splice(patient.acl.indexOf(doctor._id), 1 );
        console.log("Patient after deleting: ", patient);

        // make axios update request
        axios.put('http://localhost:4000/api/user/'+patientId, patient)
        .then(res => {
          this.setState({patient: res.data});
        })
      } else {
        // do nothing
        alert("Not Revoked!");
      } 
    }
    else
      if(window.confirm("Are you sure you want to grant access to "+doctor.first_name+ " "+ doctor.last_name+"?")) {
        // make changes
        patient.acl.push(doctor._id);
        console.log("Patient after adding: ",patient);

        // make axios update request
        axios.put('http://localhost:4000/api/user/'+patientId, patient)
        .then(res => {
          this.setState({patient: res.data});
        })
      } else {
        // do nothing
        alert("Not Granted!");
      }
  };

  getColor = id => {
    console.log("Patient state in get color: " ,this.state.patient);
    console.log("Patient in get color: " , patient);
    if(JSON.stringify(patient) === '{}')
      return '#666';
    else {
      if(patient.acl.includes(id))
        return '#b81a24';
      else
        return 'green';
    }
  }

  getPermission = id => {
    if(JSON.stringify(patient) === '{}')
      return 'Button';
    else {
      if(patient.acl.includes(id))
        return 'Revoke';
      else
        return 'Grant';
    }
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
                      <CardTitle tag="h4">Doctor List</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Grant / Revoke</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.doctorList.map(doctor =>
                            <tr>
                              <td>{doctor.first_name}</td>
                              <td>{doctor.last_name}</td>
                              <td>
                                {/* <Link to ={{
                                pathname: `/permission/grant/`+patientId,
                                state: { 
                                  did: doctor._id, 
                                }
                              }} style={{ color: '#007bff' }} className="nav-link">Permissions</Link>  */}
                                <Button onClick={e => this.handleClick(doctor)} style={{backgroundColor:this.getColor(doctor._id)}}>
                                  {this.getPermission(doctor._id)}
                                </Button>                                
                              </td>
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

export default PatientView;
