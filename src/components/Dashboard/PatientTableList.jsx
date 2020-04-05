import React from "react";
import Web3 from 'web3';
import Store from '../../abis/Store.json'
import axios from 'axios';
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

// core components
import PanelHeader from "../PanelHeader.jsx";
import Sidebar from "../Sidebar/PatientSidebar";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardFooter from "../Footers/DashboardFooter";
import Modal from '../Modal'; 

const encryption = require('../encryption.js');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

let medicalHistory = [];
let userId = "";

class PatientTableList extends React.Component {

  async componentWillMount() {
    axios.get('http://localhost:4000/api/user/'+userId)
      .then(res => {
        this.setState({ privateKey: res.data.privateKey, secretKey: res.data.secretKey, iv: res.data.iv })
        // console.log("Secret Key: " ,this.state.secretKey);
        // console.log("Private Key: " ,this.state.privateKey);
        // console.log("IV: " ,this.state.iv);
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
    // Load userId
    this.setState({userId});
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Store.networks[networkId]
    if(networkData) {
      const contract = web3.eth.Contract(Store.abi, networkData.address)
      this.setState({ contract })
      medicalHistory = await contract.methods.get(this.state.userId).call()
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
    const decryptedKey = encryption.decryptRSA(this.state.secretKey, this.state.privateKey);
    console.log("type of record data: " ,typeof record.data)

    const byteArray = encryption.callDecrypt(record.data, decryptedKey);
    console.log("byte array dec: ",byteArray);
    var arrayBufferView = new Uint8Array(byteArray);
    var blob = new Blob( [ arrayBufferView ], { type: 'image/jpg' } );

    // const dcdata = encryption.decryptAES(record.data.toString('binary'), keybuffer, iv);
    // console.log("Decrypted string: ",typeof dcdata);
    // record.file = Buffer.from(dcdata, 'binary');
    // var blob = new Blob([record.file], {'type': 'image/jpg'});
    record.url = URL.createObjectURL(blob);
    return record;
    // const enbuffer = Buffer.from(endata.encryptedData ,'binary');
    // console.log("Encrypted buffer: ",enbuffer);
    // decrypt secret key
    // use secret key to decrypt record.data
    // convert string to buffer
    // convert buffer to file
    // store in record.file
    // return record
  }
  
  // delay(hash) {
  //   return new Promise((resolve, reject) => {
  //             setTimeout(() => {
  //                 let error = false;
  //                 if(!error)
  //                     resolve(hash)
  //                 else
  //                     reject()
  //             }, 300)     
  //         });
  // }
  // async delayedLog(item) {
  //   // notice that we can await a function
  //   // that returns a promise
  //   const node = await IPFS.create()
  //   const data = await node.cat(item);
  //   this.state.ipfsData.push(data);
  // }
  // async processArray() {
  //   for (const item of this.state.medicalHistory) {
  //     await this.delayedLog(item.fileHash);
  //   }
  //   console.log('Done!');
  //   console.log("ipfs data: ",this.state.ipfsData)
  // }
  constructor(props) {
    super(props)
    console.log("View props: ", this.props);
    userId = this.props.match.params.id;
    this.state = {
      contract: null,
      web3: null,
      account: null,
      showModal: false,
      userId: "",
      privateKey: "",
      secretKey: "",
      iv: "",
      medicalHistory: [],
    }
  }

  // componentDidMount() {
  //   axios.get('http://localhost:4000/api/user/'+userId)
  //     .then(res => {
  //       this.setState({ privateKey: res.data.privateKey, secretKey: res.data.secretKey, iv: res.data.iv })
  //       console.log("Secret Key: " ,this.state.secretKey);
  //       console.log("Private Key: " ,this.state.privateKey);
  //       console.log("IV: " ,this.state.iv);
  //   });
  //   console.log("In component did mount");
  //   this.getDecryptedData();
  // }
  
  // async getDecryptedData () {
  //   console.log("In get dec data");
  //   this.setState({medicalHistory: await Promise.all(medicalHistory.map(record => this.getIPFSData(record)))})
  //   this.setState({medicalHistory: medicalHistory.map(record => this.getFile(record))})
  //   console.log("Ipfs data state list responses : ",this.state.medicalHistory);
  // }

  handleToggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  getURL = fileName => {
    console.log("Get url called :");
    medicalHistory.forEach(record => {
      if(record.fileName === fileName)
        console.log("Match found" , record.url);
        return record.url;
    })
  }

  render() {
    const { showModal } = this.state;
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
                              <td><a style={{ color: '#007bff' }} href={record.url} target="_blank" rel="noopener noreferrer">{record.fileName} </a></td>
                              <td>{record.date}</td>
                              <td>{record.by}</td>
                              <td>
                                <Button
                                  color='info'
                                  size='sm'
                                  onClick={() => this.handleToggleModal()}
                                >
                                  View
                                </Button>
                                {showModal &&
                                
                                <Modal onCloseRequest={() => this.handleToggleModal()}>
                                  <img alt="record" src={record.url} />
                                </Modal>}
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

export default PatientTableList;
