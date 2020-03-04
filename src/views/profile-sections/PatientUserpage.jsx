import React from "react";

// reactstrap components
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../../components/PanelHeader/PanelHeader.jsx";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 'select'};
    }

    handleChange = (event) =>
    this.setState({value: event.target.value});
      
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Account (disabled)</label>
                          <Input
                            defaultValue="0x31F78757A4bAe84808Aa91a1cebf43e50ca0BFd6"
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
                          <Input placeholder="Email" type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Age</label>
                          <Input 
                            placeholder="Age" type="number" 
                            min="0"
                            max="120"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Blood Group</label>
                          {/* <Input
                            // defaultValue="e.g. MBBS"
                            placeholder="e.g. O+"
                            type="list"
                          /> */}
                          <select value={this.state.value} onChange={this.handleChange} style={{width: "100%" , padding: "9px 12px", marginTop: "0px"}}>
                            <option value="select"> Select Blood Type </option>
                            <option value="op"> O+ </option>
                            <option value="on">O-</option>
                            <option value="ap">A+</option>
                            <option value="an">A-</option>
                            <option value="bp">B+</option>
                            <option value="bn">B-</option>
                            <option value="abp">AB+</option>
                            <option value="abn">AB-</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={require("../../assets/img/bg5.jpg")} />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("../../assets/img/mike.jpg")}
                      />
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                  </div>
                  <p className="description text-center">
                  "I cared for eight seconds. <br/>
                    Then I got distracted."
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;