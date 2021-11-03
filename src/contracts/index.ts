import Web3 from 'web3'
import { CONTRACTS_ADDRESSES, GasPrice_NOW, NULL_ADDRESS, GasLimitOffset } from './config'
import { ElementAPIConfig, ETHSending, Network, Token, TransactionConfig } from '../types'
import { schemas } from './abi'
import { ElementError } from '../base/error'

import unfetch from 'isomorphic-unfetch'
import { BigNumber } from '../utils/helper'
import { Contract, ContractOptions } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'

export interface LimitedCallSpec {
  to: string
  data: string
  value?: string | number
}

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
  public WETHAddr: string
  public WETHToekn: Token

  public ETH: Token = {
    name: 'etherem',
    symbol: 'ETH',
    address: NULL_ADDRESS,
    decimals: 18
  }

  public erc20: Contract
  public nftExchange: Contract
  public nftAsset: Contract

  constructor(web3: any, apiConfig: ElementAPIConfig = { networkName: Network.Main }) {

    const { networkName } = apiConfig
    this.networkName = networkName
    const options: ContractOptions = {}

    const contracts = CONTRACTS_ADDRESSES[networkName]
    const exchangeAddr = contracts.NftExchange.toLowerCase()
    const assetAddr = contracts.NftAsset.toLowerCase()
    const wethAddr = contracts.WETH.toLowerCase()
    this.WETHAddr = wethAddr
    this.WETHToekn = {
      name: 'WETH9',
      symbol: 'WETH',
      address: wethAddr,
      decimals: 18
    }
    if (exchangeAddr) {
      this.web3 = web3
      this.erc20 = new web3.eth.Contract(schemas.erc20.abi, options)
      this.nftExchange = new web3.eth.Contract(schemas.nftExchange.abi, exchangeAddr, options)
      this.nftAsset = new web3.eth.Contract(schemas.asset.abi, assetAddr, options)
    } else {
      throw new Error(`${this.networkName}  abi undefined`)
    }
  }

  public getABI(contrac: Contract, funcName: string): AbiItem {
    const abi = contrac.options.jsonInterface
    return <AbiItem>abi.find(val => {
      return val.name == funcName
    })
  }

  public async maxPriorityFeePerGas() {

    this.web3.eth.extend({
      property: 'gasFee',
      methods: [{
        name: 'maxPriorityFeePerGas',
        call: 'eth_maxPriorityFeePerGas'
      }]
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.web3.eth.gasFee.maxPriorityFeePerGas()
  }

  public async getGasPrice(): Promise<{ gasPrice: number }> {
    let gasPrice = 0
    if (this.networkName == Network.Main) {
      const response: any = await fetch(GasPrice_NOW.url)
      const res = await response.json()
      if (res.code === 200) gasPrice = res.data[GasPrice_NOW.type]
    } else {
      gasPrice = Number(await this.web3.eth.getGasPrice())
    }
    return { gasPrice }
  }

  //
  public async getGas1559Price(from: string): Promise<{ maxPriorityFeePerGas: number, maxFeePerGas: number }> {
    const block = await this.web3.eth.getBlock('latest')


    console.log(`block.number:${block.number} block.gasUsed ${block.gasUsed} baseFeePerGas ${block.baseFeePerGas} `)
    // 2 * getBlock(-1).baseFee + 1 gwei
    // console.log(block.gasUsed.div(1500e2).toString()+"% GasUsed")
    const feePerGas: number = !(block.gasUsed > 1500e4 && block.baseFeePerGas) ? Number(block.baseFeePerGas) : block.baseFeePerGas * 2
    const maxFeePerGas: number = feePerGas < 1e9 ? 10e9 : feePerGas
    const maxPriorityFeePerGas = parseInt(String(maxFeePerGas / 10))
    console.log('maxFeePerGas', maxFeePerGas.toString(), 'maxPriorityFeePerGas', maxPriorityFeePerGas.toString())

    return { maxPriorityFeePerGas, maxFeePerGas }
  }


  //发送标准交易
  public async ethSend(callData: LimitedCallSpec, from: string): Promise<ETHSending> {
    // const from = this.elementAccount
    // const gasPrice = await this.getGasPrice()
    const nonce = await this.web3.eth.getTransactionCount(from, 'latest') //latest、earliest和pending
    const pendingNonce = await this.web3.eth.getTransactionCount(from, 'pending') //latest、earliest和pending

    console.log(`estimateGas error pendingNonce:${pendingNonce}-nonce: ${nonce}`)
    const eGas = await this.web3.eth.estimateGas(callData).catch(async (error: Error) => {
      const stack = error.message || JSON.stringify(error)
      const pendingNonce = await this.web3.eth.getTransactionCount(from, 'pending') //latest、earliest和pending

      console.log(`estimateGas error pendind ${pendingNonce}-${nonce}`, stack)
      throw new ElementError({
        code: '2004',
        context: { funcName: 'estimateGas', stack }
      })
    })
    const gas = new BigNumber(String(eGas)).times(GasLimitOffset).toFixed(0)

    const gasPrice = await this.getGas1559Price(from)
    const transactionObject = {
      from,
      to: callData.to,
      value: callData.value || 0,
      gas,
      ...gasPrice,
      nonce,
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
