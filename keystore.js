const Web3 = require ('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const Store = require('./src/abis/Store.json');


async function storeKey(userId, encKey) {
    await loadBlockchainData(userId, encKey);
}

async function loadWeb3() {
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

  async function loadBlockchainData(userId, encKey) {
    // Load account
    uid = userId.toString();
    console.log("Type of id: ",typeof uid);
    const account = web3.eth.accounts[0];
    const networkId = await web3.eth.net.getId()
    const networkData = Store.networks[networkId]
    console.log("account: ",account);
    console.log("networkdata: ",networkData);
    if(networkData) {
        const contract = web3.eth.Contract(Store.abi, networkData.address)
        contract.methods.setKey(uid, encKey).send({ from: account }).then((r) => {
            console.log("Key set for :",userId);
            console.log(r);
        })
    } else {
        window.alert('Smart contract not deployed to detected network.')
    }
}

module.exports.storeKey = storeKey;