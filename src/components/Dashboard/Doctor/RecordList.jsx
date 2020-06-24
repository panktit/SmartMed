import React from "react";
import Web3 from 'web3';
import Store from '../../../abis/Store.json'
import axios from 'axios'

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "../../Headers/PanelHeader.jsx";
import Sidebar from "../../Sidebar/RecordSidebar";
import DashboardNavbar from "../../Navbars/DashboardNavbar";
import DashboardFooter from "../../Footers/DashboardFooter";

const encryption = require('../../encryption.js');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

let medicalHistory = [];
let doctorId = "";
let patientId = "";
let encKey = "";

class RecordList extends React.Component {

  async componentWillMount() {
    axios.get('http://localhost:4000/api/user/'+doctorId)
      .then(res => {
        this.setState({ privateKey: res.data.privateKey })
    });
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
    
    // Load patientId
    this.setState({doctorId});
    this.setState({patientId});
    this.setState({encKey});
    
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Store.networks[networkId]
    if(networkData) {
      const contract = web3.eth.Contract(Store.abi, networkData.address)
      this.setState({ contract })
      medicalHistory = await contract.methods.get(this.state.patientId).call()
      this.setState({ medicalHistory })
      console.log("Medical History: ", medicalHistory);
      this.setState({medicalHistory: await Promise.all(medicalHistory.map(record => this.getIPFSData(record)))})
      console.log("Ipfs data state list responses : ",this.state.medicalHistory);
      this.setState({medicalHistory: medicalHistory.map(record => this.getFile(record))})
      console.log("Ipfs data state list responses : ",this.state.medicalHistory);
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  async getIPFSData(record) {
    console.log("Function called for : ", record.fileName);
    const data = await ipfs.cat(record.fileHash)
    // data is returned as a Buffer, conver it back to a string
    console.log("ipfs data for ",record.fileName);
    record.data = data;
    return record;
  }

  getFile(record) {
    // get rsa private key
    console.log("get file function called for: ",record.fileName);
    const decryptedKey = encryption.decryptRSA(this.state.encKey, this.state.privateKey);

    const byteArray = encryption.callDecrypt(record.data, decryptedKey);
    console.log("byte array dec: ",byteArray);
    var arrayBufferView = new Uint8Array(byteArray);
    var blob = new Blob( [ arrayBufferView ], { type: 'image/jpg' } );
    record.url = URL.createObjectURL(blob);
    return record;
  }

  constructor(props) {
    super(props);
    console.log("Record Table List props: ", this.props);
    doctorId = this.props.match.params.id;
    patientId = this.props.location.state.pid;
    encKey = this.props.location.state.encKey;
    console.log("Patient id in record table list: ", patientId);
    console.log("enc key in record table list: ", encKey);
    this.state = {
      contract: null,
      web3: null,
      account: null,
      doctorId: "",
      patientId: "",
      encKey: "",
      medicalHistory: []
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
                <Col xs={10}>
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Uploaded Records</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Name</th>
                            <th>Uploaded On</th>
                            <th>Uploaded By</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.medicalHistory.map(record =>
                            <tr>
                              <td>{record.fileName}</td>
                              <td>{record.date}</td>
                              <td>{record.by}</td>
                              <td><a style={{ color: '#007bff' }} href={record.url} target="_blank" rel="noopener noreferrer">View</a></td>
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

export default RecordList;
