import React from "react";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table
} from "reactstrap";

// core components
import PanelHeader from "../PanelHeader.jsx";
import Sidebar from "../Sidebar/DoctorSidebar";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardFooter from "../Footers/DashboardFooter";

let doctorID = "";

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      patientCount: 0,
    }
  }

  componentDidMount() {
    console.log("Props in Doctor User Page: ", this.props);
    doctorID = this.props.match.params.id;
    axios.get('http://localhost:4000/api/user/'+doctorID)
      .then(res => {
        this.setState({ user: res.data });
        console.log("User state in Doctor user page: " ,this.state.user);
    });

    let patientCount = 0;
    axios.get('http://localhost:4000/api/user/patients')
      .then(res => {
        res.data.forEach(patient => {
          console.log("Patient: ",patient.list);
          if(patient.acl.includes(doctorID)) {
            patientCount++;
          }
        })
        this.setState({ patientCount });
        console.log("Patient Count: ", this.state.patientCount);
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
                <Col md="8">
                  <Card>
                    <CardHeader>
                      <h5 className="title">My Profile</h5>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col className="pr-1" md="6">
                            <FormGroup>
                              <label>Account</label>
                              <Input
                                defaultValue="0x6Ec32540D17Ba65F5F10eB8c7A132A8D74109C98"
                                disabled
                                placeholder="Account"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="6">
                            <FormGroup>
                              <label htmlFor="exampleInputEmail1">
                                Email address
                              </label>
                              <Input defaultValue={this.state.user.email} type="email" disabled/>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="6">
                            <FormGroup>
                              <label>First Name</label>
                              <Input
                                defaultValue={this.state.user.first_name}
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="6">
                            <FormGroup>
                              <label>Last Name</label>
                              <Input
                                defaultValue={this.state.user.last_name}
                                placeholder="Last Name"
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pr-1" md="4">
                            <FormGroup>
                              <label>Qualification</label>
                              <Input
                                defaultValue={this.state.user.qualification}
                                placeholder="e.g. MBBS"
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col className="px-1" md="4">
                            <FormGroup>
                              <label>Specialization</label>
                              <Input
                                defaultValue={this.state.user.specialization}
                                placeholder="e.g. Cardiology"
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="4">
                            <FormGroup>
                              <label>License Number</label>
                              <Input defaultValue={this.state.user.license} placeholder="e.g. 123456" type="text" disabled/>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-user">
                    <CardBody>
                    <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Statistics</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Number of Accessible Patients</td>
                              <td style={{color: "#007bff"}}>{this.state.patientCount}</td>
                            </tr>
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

export default User;