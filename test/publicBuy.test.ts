import Web3 from 'web3'
import { Account } from '../src/account'
// @ts-ignore
import secrets from '../../secrets.json'
import { Network } from '../src'

(async () => {
  const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)

  const account2 = web3.eth.accounts.wallet.add(secrets.accounts['0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA'])
  const defaultAddr = account2.address.toLowerCase()

  web3.eth.defaultAccount = defaultAddr
  const accounts = new Account(web3,{networkName:Network.Rinkeby})

  try {
    const res = await accounts.saleLive()
    console.log('saleLive', res)
    // if (!res) return
    const res1 = await accounts.publicBuy('1')
    res1.txSend.once('confirmation', async (num, tx, error) => {
      console.log(num)
    })

  } catch (e) {
    console.log(e)
  }
})()
