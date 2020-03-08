
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";
import FileUpload from '../../components/FileUpload';

class Upload extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Upload a new record</h5>
                </CardHeader>
                <CardBody>
                  <FileUpload />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Upload;
