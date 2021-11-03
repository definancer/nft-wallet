import { ContractSchemas } from './contracts'
import Web3 from 'web3'
import {
  ElementAPIConfig, Network
} from './types'

import { EventData } from 'web3-eth-contract'

export class Asset extends ContractSchemas {

  constructor(web3: Web3, apiConfig?: ElementAPIConfig) {
    super(web3, apiConfig)
  }

  private sendCall<T, U>(method: string, params?: Array<T>): Promise<U> {
    if (params) {
      return this.nftAsset.methods[method](...params).call()
    } else {
      return this.nftAsset.methods[method]().call()
    }
  }

  public async saleLive() {
    return this.sendCall<unknown, boolean>('saleLive')
  }

  public async presaleLive() {
    return this.sendCall<unknown, boolean>('presaleLive')
  }

  public async checkSignature(sender: string, signature: string) {
    return this.sendCall<string, boolean>(
      'checkSignature',
      [sender, signature])
  }

  public async pricePerToken() {
    return this.sendCall<unknown, string>('pricePerToken')
  }

  public async balanceOf(owner: string): Promise<string> {
    return this.sendCall<string, string>('balanceOf', [owner])
  }

  public async totalSupply(): Promise<string> {
    return this.sendCall<{ owner: string }, string>('totalSupply')
  }

  public async getEvents(
    { name, fromBlock, toBlock = 'latest', filter }
      : { name: string, fromBlock: string, toBlock?: string, filter?: any }): Promise<EventData[]> {
    // const fromBlock = 9527340
    // filter: {from: ['0x53edE7caE3eB6a7D11429Fe589c0278C9acBE21A']},
    const abi = this.getABI(this.nftAsset, name)
    if (abi.type !== 'event') {
      throw  'abi error'
    }
    return this.nftAsset.getPastEvents(name, {
      fromBlock,
      toBlock,
      filter
    })
  }
}
