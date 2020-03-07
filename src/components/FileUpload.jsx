import React, { Component } from 'react';
import Web3 from 'web3';
import Store from '../abis/Store.json'
import { Button } from 'reactstrap';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
let medicalHistory = [];

class FileUpload extends Component {

  async componentWillMount() {
    await this.loadWeb3()
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

  constructor(props) {
    super(props)

    this.state = {
      contract: null,
      web3: null,
      buffer: null,
      account: null,
      medicalHistory: []
    }
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    console.log(file);
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting file to ipfs...")
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }
       this.state.contract.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
         medicalHistory.push(result[0].hash);
         return this.setState({ medicalHistory})
       })
    })
  }

  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <form onSubmit={this.onSubmit} >
                  <input  type='file' onChange={this.captureFile} />
                  <Button type='submit' color='info' size='sm' > Submit </Button>
                </form>
                <p>&nbsp;</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;