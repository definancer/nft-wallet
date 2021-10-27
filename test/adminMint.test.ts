import Web3 from 'web3'
import { Account } from '../src/account'
// @ts-ignore
import secrets from '../../secrets.json'
import { EventData } from 'web3-eth-contract'

(async () => {
  const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)

  const account1 = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])
  // const account2 = web3.eth.accounts.wallet.add(secrets.accounts['0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA'])
  const defaultAddr = account1.address.toLowerCase()

  web3.eth.defaultAccount = defaultAddr
  const accounts = new Account(web3)

  try {
    const res = await accounts.saleLive()
    console.log(res)
    // const res1 = await accounts.adminMint('0x7335Bae9c88c59382621A2FBE08A353a93510F56')

    const res1 = await accounts.toggleSaleStatus()


    res1.txSend.on('confirmation', async (num, tx, error) => {
      console.log(num)
      // const price = await accounts.pricePerToken()
      // console.log(price)
      const events: Array<EventData> = await accounts.getMintInfoEvents()
      console.log(events)
      // for (const event of events) {
      //   console.log(event.blockNumber, event.returnValues)
      // }
    })
  } catch (e) {
    console.log(e)
  }
})()
