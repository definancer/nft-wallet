import Web3 from 'web3'
import { Exchange } from '../src/exchange'
// @ts-ignore
import secrets from '../../secrets.json'
import { Network } from '../src'

(async () => {
  // const rpcUrl = `https://mainnet.infura.io/v3/${secrets.infuraKey}`
  const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)

  const mint = web3.eth.accounts.wallet.add(secrets.accounts['0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA'])
  const signer = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])

  const defaultAddr = signer.address.toLowerCase()

  web3.eth.defaultAccount = defaultAddr
  const accounts = new Exchange(web3, { networkName: Network.Rinkeby })

  try {
    const isPresaleLive = await accounts.presaleLive()
    console.log('presaleLive', isPresaleLive)

    if (!isPresaleLive) return

    const hashAddr = web3.utils.sha3(mint.address)
    const web3AccountSignature = web3.eth.accounts.sign(hashAddr || '', signer.privateKey || '')
    console.log(web3AccountSignature)

    const ethSign =await web3.eth.sign(hashAddr || '', signer.address)

    console.log(ethSign)

    // const sig = web3AccountSignature.signature
    // const sig = "0x5f429f23eed6670e4266c330d90b165967cfda1919d8ba4dbc4c310d22fac57f427d833fb9c6f983eaa4794a822539d907062319ef648acddbd5428f606b83351c"




  } catch (e) {
    console.log(e)
  }
})()
