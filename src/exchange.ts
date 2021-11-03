import Web3 from 'web3'

import { Asset } from './asset'
import {
  ElementAPIConfig,
  ETHSending
} from './types'

import { Helper } from './utils/helper'

export class Exchange extends Asset {
  public buyAccount: string

  constructor(web3: Web3, apiConfig?: ElementAPIConfig) {
    super(web3, apiConfig)
    this.buyAccount = apiConfig?.account || web3.eth.defaultAccount?.toLowerCase() || ''
  }

  private async change<T>(method: string, params?: Array<T>, value?: string) {
    const func = this.nftExchange.methods[method]
    const abi = this.getABI(this.nftExchange, method)
    if (abi.type !== 'function') {
      throw  'abi error'
    }

    if (abi.payable && !value) {
      value = '0'
    }
    let data = ''
    if (params) {
      data = func(...params).encodeABI()
    } else {
      data = func().encodeABI()
    }
    const callData = { to: this.nftExchange.options.address, data, value }
    return super.ethSend(callData, this.buyAccount)
  }

  public async presaleBuy(sig: string): Promise<ETHSending> {
    return this.change<string>('presaleBuy', [sig])
  }

  public async publicBuy(qty: string): Promise<ETHSending> {
    const price = await this.pricePerToken()
    const value = Helper.makeBigNumber(qty).times(price).toString()
    return this.change<string>('publicBuy', [qty], value)
  }

  public async toggleSaleStatus(): Promise<ETHSending> {
    return this.change<unknown>('toggleSaleStatus')
  }

  public async togglePresaleStatus(): Promise<ETHSending> {
    return this.change<unknown>('togglePresaleStatus')
  }

  public async adminMint(qty: string, to: string): Promise<ETHSending> {
    return this.change<unknown>('adminMint')
  }

  public async changePrice(newPrice: string): Promise<ETHSending> {
    return this.change<string>('changePrice', [newPrice])
  }

  public async withdrawEarnings(): Promise<ETHSending> {
    return this.change<unknown>('withdrawEarnings')
  }
}
