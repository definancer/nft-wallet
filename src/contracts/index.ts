import Web3 from 'web3'
import { CONTRACTS_ADDRESSES, GasPrice_NOW, NULL_ADDRESS, GasLimitOffset } from './config'
import { ElementAPIConfig, ETHSending, Network, Token, TransactionConfig } from '../types'
import { AnnotatedFunctionOutput, LimitedCallSpec } from '../schema/types'
import { common } from '../schema/schemas'
import { ElementError } from '../base/error'

import unfetch from 'isomorphic-unfetch'
import { BigNumber } from '../utils/constants'

let fetch: any
if (typeof window === 'undefined') {
  fetch = unfetch
} else {
  fetch = window.fetch.bind(window)
}

export class ContractSchemas {
  public web3: Web3

  public networkName: Network
  // public assetSchemas: any
  // address
  public contractsAddr: any
  public WETHAddr: string
  public nftAssetAddr: string

  public nftExchangeAddr: string

  public WETHToekn: Token

  public ETH: Token = {
    name: 'etherem',
    symbol: 'ETH',
    address: NULL_ADDRESS,
    decimals: 18
  }

  public Erc20Func
  public NftExchangeFunc
  public NftExchangeEvent

  constructor(web3: any, apiConfig: ElementAPIConfig = { networkName: Network.Rinkeby }) {

    const { networkName } = apiConfig
    console.log('networkName2', networkName)
    this.networkName = networkName
    const contracts = CONTRACTS_ADDRESSES[networkName]
    const exchangeAddr = contracts.NftExchange.toLowerCase()
    const assetAddr = contracts.NftAsset.toLowerCase()
    const wethAddr = contracts.WETH.toLowerCase()
    this.contractsAddr = contracts
    this.WETHAddr = wethAddr
    this.WETHToekn = {
      name: 'WETH9',
      symbol: 'WETH',
      address: wethAddr,
      decimals: 18
    }
    this.nftAssetAddr = assetAddr
    if (exchangeAddr) {
      this.web3 = web3
      this.nftExchangeAddr = exchangeAddr
      this.Erc20Func = common.ERC20Schema.functions
      this.NftExchangeFunc = common.NftExchangeSchemas.functions
      this.NftExchangeEvent = common.NftExchangeSchemas.events
    } else {
      throw new Error(`${this.networkName}  abi undefined`)
    }
  }

  public async ethCall(callData: LimitedCallSpec, outputs: AnnotatedFunctionOutput[]): Promise<any> {
    const hexStr = await this.web3.eth.call(callData)
    const params = this.web3.eth.abi.decodeParameters(outputs, hexStr)
    if (params.__length__ == 1) {
      return params[0]
    }
    return params
  }

  public async getGasPrice(): Promise<number> {
    let gasPrice = 0
    if (this.networkName == Network.Main) {
      const response: any = await fetch(GasPrice_NOW.url)
      const res = await response.json()
      if (res.code === 200) gasPrice = res.data[GasPrice_NOW.type]
    } else {
      gasPrice = Number(await this.web3.eth.getGasPrice()) + 10000
    }
    return gasPrice
  }

  //发送标准交易
  public async ethSend(callData: LimitedCallSpec, from: string): Promise<ETHSending> {
    // const from = this.elementAccount
    // const gasPrice = await this.getGasPrice()
    const eGas = await this.web3.eth.estimateGas(callData).catch((error: Error) => {
      const stack = error.message || JSON.stringify(error)
      console.log('estimateGas error', stack)
      throw new ElementError({
        code: '2004',
        context: { funcName: 'estimateGas', stack }
      })
    })
    const gas = new BigNumber(String(eGas)).times(GasLimitOffset).toFixed(0)
    const nonce = await this.web3.eth.getTransactionCount(from)
    // const gasPrice =await this.getGasPrice()
    const transactionObject = {
      from,
      to: callData.to,
      value: callData.value || 0,
      nonce,
      gas,
      data: callData.data
    } as TransactionConfig

    return new Promise((resolve, reject) => {
      const txSend = this.web3.eth.sendTransaction(transactionObject)
      txSend
        .once('transactionHash', (txHash: string) => {
          resolve({ txSend, txHash })
        })
        .catch((reason) => reject(reason))
    })
  }
}
