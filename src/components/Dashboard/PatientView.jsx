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

class PatientView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorList: []
    }
  }

  componentDidMount() {
    console.log("Patient View props: ", this.props);
    patientId = this.props.match.params.id;
    axios.get('http://localhost:4000/api/user/doctors')
      .then(res => {
        this.setState({doctorList : res.data});
    });
    // console.log("Doctor details list: ",this.state.doctorList);
    // console.log("length: ",this.state.doctorList.length);
  }

  handleClick = id => {
    alert(id);
  };

  getColor = id => {
    if(id === '5e63702f211ade1ab0adb295')
      return '#b81a24';
    else
      return 'green';
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
                                <Button onClick={e => this.handleClick(doctor._id)} style={{backgroundColor:this.getColor(doctor._id)}}>
                                  Button
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
