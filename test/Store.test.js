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
        it('deploys successfully' , async() => {
            const address = store.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe('storage' , async() => {
        it('updates the fileHash' , async() => {
            let fileHash
            fileHash = 'abc123'
            await store.set(fileHash)
            const result = await store.get()
            assert.equal(result,fileHash)
        })
    })
})