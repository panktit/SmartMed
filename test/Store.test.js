const Store = artifacts.require("Store");


require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Store', (accounts) => {
    let store
    before(async ()=> {
        store = await Store.deployed()
    })

    describe('deployment' , async() => {
        it('contract deploys successfully' , async() => {
            const address = store.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe('encryptedKey storage' , async() => {
        it('stores encrypted secret key to blockchain' , async() => {
            let user = 'user'
            let encKey = 'secret'
            await store.setKey(user, encKey)
            const result = await store.getKey(user)
            assert.equal(result,encKey)
        })
    })

    describe('file storage' , async() => {
        it('stores file details to blockchain' , async() => {
            let user = 'user'
            let fileName = 'abc.jpg'
            let date = '23/04/2020'
            let fileHash = 'Qmdfydkgfss'
            let by = 'user'
            await store.set(user, fileName, date, fileHash, by)
            const result = await store.get(user)
            assert.equal(result[0].fileName,fileName)
            assert.equal(result[0].date,date)
            assert.equal(result[0].fileHash,fileHash)
            assert.equal(result[0].by,by)
        })
    })

    // add test case for getCount method
    describe('medical history' , async() => {
        it('increments file count in user medical history' , async() => {
            let user = 'myuser'
            let result = await store.getCount(user)
            assert.equal(result, 0, 'medical history initially empty')
            await store.set(user, 'test.jpg', '23/04/2020', 'Qmsdhgsdg', 'doctor')
            result = await store.getCount(user)
            assert.equal(result, 1, 'medical history incremented by 1')
        })
    })
})