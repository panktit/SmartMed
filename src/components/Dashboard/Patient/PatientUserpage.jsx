import React from "react";
import axios from "axios";
import Web3 from 'web3';
import Store from '../../../abis/Store.json'

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
import PanelHeader from "../../PanelHeader.jsx";
import Sidebar from "../../Sidebar/PatientSidebar";
import DashboardNavbar from "../../Navbars/DashboardNavbar";
import DashboardFooter from "../../Footers/DashboardFooter";

let patientID = "";
let docsCount = "";

class User extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load userId
    
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log("User id: ", this.state.user._id);
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Store.networks[networkId]
    if(networkData) {
      const contract = web3.eth.Contract(Store.abi, networkData.address)
      this.setState({ contract })
      docsCount = await this.state.contract.methods.getCount(this.state.user._id).call()
      this.setState({docsCount : parseInt(docsCount._hex)})
      console.log("Count: ", this.state.docsCount);
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

    constructor(props) {
      super(props);
      this.state = {
        user: {},
        doctorCount: 0,
        docsCount: "",
        contract: null,
        web3: null,
        account: null,
      }
    }

    componentDidMount() {
      console.log("Props in Patient User Page: ", this.props);
      patientID = this.props.match.params.id;
      axios.get('http://localhost:4000/api/user/'+patientID)
        .then(res => {
          this.setState({ user: res.data });
          this.setState({doctorCount: res.data.acl.length});
          console.log("User state in Patient user page: " ,this.state.user);
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
                                defaultValue={this.state.account}
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
                              <Input defaultValue={this.state.user.email} type="email" disabled />
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
                          <Col className="pr-1" md="6">
                            <FormGroup>
                              <label>Age</label>
                              <Input 
                                defaultValue={this.state.user.age} 
                                type="number" 
                                min="0"
                                max="120"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pl-1" md="6">
                            <FormGroup>
                              <label>Blood Group</label>
                              <Input
                                defaultValue={this.state.user.blood_group}
                                type="text"
                                disabled
                              />
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
                            <td>Number of Permitted Doctors</td>
                            <td style={{color: "#007bff"}}>{this.state.doctorCount}</td>
                          </tr>
                          <tr>
                            <td>Number of Documents</td>
                            <td style={{color: "#007bff"}}>{this.state.docsCount}</td>
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