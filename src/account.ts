import { ContractSchemas } from './contracts/index'
import Web3 from 'web3'
import {
  ElementAPIConfig,
  ETHSending,
  ExchangeMetadata,
  Network
} from './types'

import {
  encodeParamsCall,
  encodeWeb3Call,
  getBalanceSchemas, LimitedCallSpec
} from './schema'
import { BigNumber, MAX_UINT_256, NULL_ADDRESS } from './utils/constants'
import { AnnotatedFunctionABI } from './schema/types'
import { makeBigNumber } from './utils/helper'
import { EventData } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'

// 根据 DB签名过的订单 make一个对手单
export class Account extends ContractSchemas {
  // public ethApi: EthApi
  public buyAccount: string

  constructor(web3: Web3, apiConfig?: ElementAPIConfig) {
    super(web3, apiConfig)
    this.buyAccount = apiConfig?.account || web3.eth.defaultAccount?.toLowerCase() || ''
  }

  public async presaleBuy(sig: string): Promise<ETHSending> {
    const to = this.nftExchangeAddr
    const abi = this.NftExchangeFunc.presaleBuy({
      address: to,
      sig
    })
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethSend(callData, this.buyAccount)
  }


  public async publicBuy(qty: string) {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABIInput('publicBuy', { qty }) as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })


    const price = await this.pricePerToken()
    const value = makeBigNumber(qty).times(price).toString()
    const callData = { to, data, value }

    return this.ethSend(callData, this.buyAccount)
  }

  public async saleLive() {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABI('saleLive') as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethCall(callData, abi.outputs)
  }

  public async presaleLive() {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABI('presaleLive') as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi: abi })
    const callData = { to, data }
    return this.ethCall(callData, abi.outputs)
  }

  public async pricePerToken() {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABI('pricePerToken') as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethCall(callData, abi.outputs)
  }

  public async balanceOf(account?: string): Promise<string> {
    const owner = account || this.buyAccount
    const to = this.nftAssetAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABIInput('balanceOf', { owner }) as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethCall(callData, abi.outputs)
  }

  public async totalSupply(account?: string): Promise<string> {
    const to = this.nftAssetAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABI('totalSupply') as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethCall(callData, abi.outputs)
  }

  public async checkSignature(sender: string, signature: string) {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABIInput('checkSignature', { sender, signature }) as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethCall(callData, abi.outputs)
  }


  public async toggleSaleStatus() {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABI('toggleSaleStatus') as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethSend(callData, this.buyAccount)
  }

  public async togglePresaleStatus() {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABI('togglePresaleStatus') as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethSend(callData, this.buyAccount)
  }

  public async changePrice(newPrice: string) {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABIInput('changePrice', { newPrice }) as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data }
    return this.ethSend(callData, this.buyAccount)
  }


  public async adminMint(qty: string, to: string) {
    const nftExchangeAddr = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABIInput('changePrice', { qty, to }) as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to: nftExchangeAddr, data }
    return this.ethSend(callData, this.buyAccount)
  }


  public async withdrawEarnings() {
    const to = this.nftExchangeAddr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const abi = this.getABI('withdrawEarnings') as AnnotatedFunctionABI
    const data = encodeParamsCall({ abi })
    const callData = { to, data } as LimitedCallSpec
    return this.ethSend(callData, this.buyAccount)
  }

  public async getEvents(
    { name, fromBlock, toBlock = 'latest', filter }
      : { name: string, fromBlock: string, toBlock?: string, filter?: any }): Promise<EventData[]> {
    const event = this.getABI(name) as AbiItem
    const transferContract = new this.web3.eth.Contract([event], this.nftExchangeAddr)
    // const fromBlock = 9527340
    // filter: {from: ['0x53edE7caE3eB6a7D11429Fe589c0278C9acBE21A']},
    return await transferContract.getPastEvents(name, {
      fromBlock,
      toBlock,
      filter
    })
  }

  public async getAccountBalance(account?: string, tokenAddr?: string): Promise<{ ethBal: string; erc20Bal: string }> {
    const owner = account || this.buyAccount
    const ethBal: string = await this.web3.eth.getBalance(owner, 'latest')
    let erc20Bal = '0'
    if (tokenAddr && tokenAddr !== NULL_ADDRESS) {
      erc20Bal = await this.getTokenBalances(tokenAddr, owner)
    }
    return { ethBal, erc20Bal }
  }

  public async getTokenBalances(to: string, account?: string): Promise<string> {
    const owner = account || this.buyAccount
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const accountBal = this.Erc20Func.countOf({ address: to })
    const data = encodeParamsCall({ abi: accountBal, owner })
    const callData = { to, data }
    return this.ethCall(callData, accountBal?.outputs)
  }


  public async getAssetBalances(metadata: ExchangeMetadata, account?: string): Promise<string> {
    const owner = account || this.buyAccount
    const accountBal = getBalanceSchemas(metadata)
    const data = encodeParamsCall({ abi: accountBal, owner })
    const callData = { to: accountBal.target, data } as LimitedCallSpec
    const bal = await this.ethCall(callData, accountBal?.outputs)
    if (accountBal?.outputs[0].type === 'address') {
      return bal.toLowerCase() === owner.toLowerCase() ? '1' : '0'
    } else {
      return bal
    }
  }
}
