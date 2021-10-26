/* globals describe:false,it:false */

const Web3 = require('web3')
const secrets = require('../../../secrets.json')
let web3Provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${secrets.infuraKey}`)
const web3 = new Web3(web3Provider)
//0xeA199722372dea9DF458dbb56be7721af117a9Bc
let account1 = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])
web3.eth.defaultAccount = account1.address.toLowerCase()

const { schemas } = require('../../lib/index.js')

console.log()

const cryptoPunks = schemas.main.filter((value) => value.name === 'CryptoPunks')[0]

;(async () => {
  const event = cryptoPunks.events.transfer[0]
  const transferContract = new web3.eth.Contract([event], event.target)
  const fromBlock = cryptoPunks.deploymentBlock
  const toBlock = 'latest'
  const logs = await transferContract.getPastEvents(event.name, {
    filter: { from: ['0x53edE7caE3eB6a7D11429Fe589c0278C9acBE21A'] },
    fromBlock,
    toBlock
  })
  console.log(logs)
})()

// schemas.main.map((schema) => {
//   describe(schema.name, () => {
//     it('should have a unique name', () => {
//       const matching = schemas.main.filter((s) => s.name === schema.name)
//       assert.equal(matching.length, 1, 'Schema name ' + schema.name + ' is not unique')
//     })
//
//     const transfer = schema.events.transfer[0]
//     if (transfer) {
//       const transferContract = web3.eth.Contract([transfer],transfer.target)
//       it('should have some transfer events', async () => {
//         const fromBlock = schema.deploymentBlock
//         const toBlock = fromBlock + 10000
//         const events = await promisify((c) => transferContract[transfer.name]({}, { fromBlock, toBlock }).get(c))
//         console.log(events.length + ' transfer events for schema ' + schema.name + ' in first 10000 blocks')
//         assert.equal(events.length > 0, true, 'No transfer events found in first 10000 blocks')
//       })
//     }
//   })
// })
