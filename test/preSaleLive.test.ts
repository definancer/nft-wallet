import Web3 from 'web3'
import { Account } from '../src/account'
// @ts-ignore
import secrets from '../../secrets.json'
import { EventData } from 'web3-eth-contract'

(async () => {
  const rpcUrl = `https://mainnet.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)

  // 0x32f4B63A46c1D12AD82cABC778D75aBF9889821a,


  const account1 = web3.eth.accounts.wallet.add(secrets.accounts['0x32f4B63A46c1D12AD82cABC778D75aBF9889821a'])
  const defaultAddr = account1.address.toLowerCase()

  web3.eth.defaultAccount = defaultAddr
  const accounts = new Account(web3)

  try {
    const res = await accounts.presaleLive()
    console.log('presaleLive', res)
    if (res) return
    const res1 = await accounts.togglePresaleStatus()
    res1.txSend.once('confirmation', async (num, tx, error) => {
      console.log(num)
    })

  } catch (e) {
    console.log(e)
  }
})()
