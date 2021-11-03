import Web3 from 'web3'
import { Account } from '../src/account'
// @ts-ignore
import secrets from '../../secrets.json'
import { Network } from '../src'

(async () => {
  // const rpcUrl = `https://mainnet.infura.io/v3/${secrets.infuraKey}`
  const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)

  // const account1 = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])
  const signer = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])

  const signAddr ="0x237d871e804D1E5d7a170de75681B6cedB66882C"
  const defaultAddr = signer.address.toLowerCase()

  web3.eth.defaultAccount = defaultAddr
  const accounts = new Account(web3,{networkName:Network.Rinkeby})

  try {
    const isPresaleLive = await accounts.presaleLive()
    console.log('presaleLive', isPresaleLive)

    if (!isPresaleLive) return

    const hashAddr = web3.utils.sha3(signAddr)
    const web3AccountSignature = web3.eth.accounts.sign(hashAddr || '', signer.privateKey || '')

    const sig = web3AccountSignature.signature
    // const sig = "0x5f429f23eed6670e4266c330d90b165967cfda1919d8ba4dbc4c310d22fac57f427d833fb9c6f983eaa4794a822539d907062319ef648acddbd5428f606b83351c"

    const isBuy = await accounts.checkSignature(signAddr, sig)
    console.log('checkSignature', isBuy)
    if (!isBuy) return
    const res1 = await accounts.presaleBuy(sig)

    console.log('res1.txSend',res1.txHash)
    res1.txSend.once('confirmation', async (num, tx, error) => {
      console.log(num)

    })
  } catch (e) {
    console.log(e)
  }
})()
