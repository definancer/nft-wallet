import Web3 from 'web3'
import { Account } from '../src/account'
// @ts-ignore
import secrets from '../../secrets.json'
import { Network } from '../src'

(async () => {
  const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)

  const account1 = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])
  // const account2 = web3.eth.accounts.wallet.add(secrets.accounts['0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA'])
  const defaultAddr = account1.address.toLowerCase()

  web3.eth.defaultAccount = defaultAddr
  const accounts = new Account(web3,{networkName:Network.Rinkeby})

  try {

    const balanceOf = await accounts.balanceOf();

    const totalSupply = await accounts.totalSupply();


    // 检查签名
    const res0 = await accounts.checkSignature("0x633f6c7E25eE757d12643A32cE1586AC9e8542d5","0x3c706aa2e9a991885aa8f5decc975d7876be8304738bc476cd016683ffd2fdc900d918303d1aae2593d8fd1815b293eb1d7fcb8d0c99672be12689dfce2700ca1b")


    // 检查是否开售
    const res = await accounts.saleLive()

    // 检查是否能预售
    const res1 = await accounts.presaleLive()


    const res3 = await accounts.pricePerToken()




  } catch (e) {
    console.log(e)
  }
})()
