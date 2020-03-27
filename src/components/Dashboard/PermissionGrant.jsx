import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../PanelHeader.jsx";
import Sidebar from "../Sidebar/PermissionSidebar";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardFooter from "../Footers/DashboardFooter";
let patientId = "";
let doctorId = "";

class PermissionGrant extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        doctorList: [{}]
    }
  }

  componentDidMount() {
    console.log("Permission Grant props: ", this.props);
    patientId = this.props.match.params.id;
    console.log("Patient id in Permission Grant: ",patientId);
    doctorId = this.props.location.state.did; 
    console.log("Doctor id in Permission Grant: ",doctorId);
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
                      <CardTitle tag="h4">Permissions</CardTitle>
                    </CardHeader>
                    <CardBody>
                      
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

export default PermissionGrant;