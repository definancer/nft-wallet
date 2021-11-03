import { isMetamaskLock, onConnectMetaMask } from './connectors/metaMask'
import { cookiesName, setWindowWeb3 } from './helper'
import { ConnectorNames } from './connectors'
import Web3 from 'web3'
import {  CONTRACTS_ADDRESSES, RPC_PROVIDER } from '../contracts/config'
import { abi } from '../contracts/abi/MaskhumanV2.json'


import Cookies from 'js-cookie'
import { AbiItem } from 'web3-utils'
import { ElementAPIConfig, Network } from '../types'

export class Wallet {
  public walletName: ConnectorNames | undefined
  public ethereum: any
  public account: string | undefined
  public chainId: string | undefined

  constructor() {
    this.walletName = Cookies.get(cookiesName.walletName) as ConnectorNames
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.ethereum = window.ethereum
    const ethereum = this.ethereum


    // 判断是否是登出
    this.account = Cookies.get(cookiesName.account)
    this.chainId = Cookies.get(cookiesName.chainId)

    if (ethereum && ethereum.isImToken) {
      Cookies.set(cookiesName.walletName, ConnectorNames.ImToken)
      console.log('ImToken APP')
    }
    if (ethereum && ethereum.isMathWallet) {
      Cookies.set(cookiesName.walletName, ConnectorNames.MathWallet)
      console.log('MathWallet APP')
    }
    if (ethereum && ethereum.isTokenPocket) {
      Cookies.set(cookiesName.walletName, ConnectorNames.TokenPocket)
      console.log('TokenPocket APP')
    }
  }

  static nftAssetsCall(apiConfig: ElementAPIConfig = { networkName: Network.Main }) {
    const networkName = apiConfig.networkName
    const web3 = new Web3(RPC_PROVIDER[networkName])
    const abiInterface = abi as AbiItem[]
    return new web3.eth.Contract(abiInterface, CONTRACTS_ADDRESSES[networkName].NftAsset)
  }

  async connectWallet(): Promise<Web3 | undefined> {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log(this.ethereum)
      if (this.ethereum) {
        const isLock = await isMetamaskLock()
        if (!isLock) {
          console.log('Metamask is lock')
          return
        }
        const { accounts } = await onConnectMetaMask(this.ethereum)
        // newWeb3.eth.defaultAccount
        return setWindowWeb3(this.ethereum, accounts)
      } else {
        return
      }
    } catch (e) {
      throw e
    }
  }
}

