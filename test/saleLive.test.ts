import Web3 from 'web3'
import { Account } from '../src/account'
// @ts-ignore
import secrets from '../../secrets.json'
import { EventData } from 'web3-eth-contract'

(async () => {
  const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)

  const account1 = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])
  const defaultAddr = account1.address.toLowerCase()

  web3.eth.defaultAccount = defaultAddr
  const accounts = new Account(web3)

  try {
    const res = await accounts.saleLive()
    console.log('saleLive', res)
    if (res) return
    const res1 = await accounts.toggleSaleStatus()
    res1.txSend.once('confirmation', async (num, tx, error) => {
      console.log(num)
    })

  } catch (e) {
    console.log(e)
  }
})()
