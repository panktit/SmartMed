import React from "react";
import axios from "axios";
import Web3 from 'web3';
import Store from '../../../abis/Store.json'
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
import PanelHeader from "../../Headers/PanelHeader.jsx";
import Sidebar from "../../Sidebar/PatientSidebar";
import DashboardNavbar from "../../Navbars/DashboardNavbar";
import DashboardFooter from "../../Footers/DashboardFooter";
const encryption = require('../../encryption.js');

let patientId = "";
let patient = {};
let secretKey = "";

class PatientView extends React.Component {

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
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log("Patient id: ", patientId);
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Store.networks[networkId]
    if(networkData) {
      const contract = web3.eth.Contract(Store.abi, networkData.address)
      this.setState({ contract })
      secretKey = await this.state.contract.methods.getKey(patientId).call()
      this.setState({secretKey})
      console.log("Secret key from blockchain: ", this.state.secretKey);
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      doctorList: [],
      patient: {},
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      secretKey: "",
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

        for (var n = 0 ; n < doctor.acl.length ; n++) {
          if (doctor.acl[n].pid === patient._id) {
            doctor.acl.splice(n,1);
            break;
          }
        }

        // make axios update request
        axios.put('http://localhost:4000/api/user/'+patientId, patient)
        .then(res => {
          this.setState({patient: res.data});
        })

        // make axios update request
        axios.put('http://localhost:4000/api/user/'+doctor._id, doctor)
        .then(res => {
          console.log("Doctor updated: ",res.data);
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
        const rencKey = this.reEncrypt(this.state.secretKey, doctor.publicKey);
        doctor.acl.push({pid: patient._id, encKey: rencKey});

        // make axios update request
        axios.put('http://localhost:4000/api/user/'+patientId, patient)
        .then(res => {
          this.setState({patient: res.data});
        })
        axios.put('http://localhost:4000/api/user/'+doctor._id, doctor)
        .then(res => {
          console.log("Doctor updated: ",res.data);
        })
      } else {
        // do nothing
        alert("Not Granted!");
      }
  };

  reEncrypt(secretKey, publicKey) {
    const decryptedKey = encryption.decryptRSA(secretKey, this.state.patient.privateKey);
    const dcEncrypted = encryption.encryptRSA(decryptedKey, publicKey)
    return dcEncrypted;
  }

  getColor = id => {
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
