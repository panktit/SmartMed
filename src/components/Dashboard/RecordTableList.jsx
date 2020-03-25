import React from "react";
import Web3 from 'web3';
import Store from '../../abis/Store.json'

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "../PanelHeader.jsx";
import Sidebar from "../Sidebar/RecordSidebar";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import DashboardFooter from "../Footers/DashboardFooter";

let medicalHistory = [];
let userId = "";

class RecordList extends React.Component {

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
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    console.log("Record Table List props: ", this.props);
    userId = this.props.location.state.pid;
    console.log("Patient id in record table list: ", userId);
    this.state = {
      contract: null,
      web3: null,
      account: null,
      userId: "",
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
                <Col xs={8}>
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
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.medicalHistory.map(record =>
                            <tr>
                              <td><a style={{ color: '#007bff' }}href={'https://ipfs.infura.io/ipfs/'+record.fileHash} target="_blank" rel="noopener noreferrer">{record.fileName} </a></td>
                              <td>{record.date}</td>
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
