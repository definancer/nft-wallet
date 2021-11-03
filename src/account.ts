import { Exchange } from './exchange'
import Web3 from 'web3'
import {
  ElementAPIConfig
} from './types'


// 根据 DB签名过的订单 make一个对手单
export class Account extends Exchange {
  public buyAccount: string

  constructor(web3: Web3, apiConfig?: ElementAPIConfig) {
    super(web3, apiConfig)
    this.buyAccount = apiConfig?.account || web3.eth.defaultAccount?.toLowerCase() || ''
  }

  public async getAccountBalance(account?: string, tokenAddr?: string): Promise<{ ethBal: string; erc20Bal: string }> {
    const owner = account || this.buyAccount
    const ethBal: string = await this.web3.eth.getBalance(owner, 'latest')
    let erc20Bal = '0'
    if (tokenAddr && this.web3.utils.isAddress(tokenAddr)) {
      erc20Bal = await this.getTokenBalances(tokenAddr, owner)
    }
    return { ethBal, erc20Bal }
  }

  public async getTokenBalances(to: string, account?: string): Promise<string> {
    const owner = account || this.buyAccount
    const erc20 = this.erc20.clone()
    erc20.options.address = to
    return erc20.methods.balanceOf(owner).call()
  }

  public async getWhiteListSignature({ address, qty }: { address: string, qty?: string }): Promise<string> {
    const hashAddr = this.web3.utils.sha3(address)
    return this.web3.eth.sign(hashAddr || '', this.buyAccount)
  }
}
