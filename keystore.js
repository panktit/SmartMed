const Web3 = require ('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const Store = require('./src/abis/Store.json');


async function storeKey(userId, encKey) {
    // Load account
    uid = userId.toString();
    console.log("Type of id: ",typeof uid);
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    balance = await web3.eth.getBalance(account);
    const networkId = await web3.eth.net.getId()
    const networkData = Store.networks[networkId]
    console.log("account: ",account);
    console.log("balance: ",balance);
    console.log("networkdata: ",networkData);
    if(networkData) {
        const contract = web3.eth.Contract(Store.abi, networkData.address)
        contract.methods.setKey(uid, encKey).send({ from: account, gas:3000000 }).then((r) => {
            console.log("Key set for :",userId);
            console.log(r);
        })
    } else {
        window.alert('Smart contract not deployed to detected network.')
    }
}

module.exports.storeKey = storeKey;