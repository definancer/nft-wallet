import { Wallet } from '../src/wallet'
import { Network } from '../src'

(async () => {
  // const wallet = new Wallet()
  const asset = Wallet.nftAssetsCall({networkName:Network.Rinkeby})
  const totalSupply = await asset.methods.totalSupply().call()
  console.log(totalSupply)
})()
