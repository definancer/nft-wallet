import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 1e9 })

import { ElementAPIConfig, Network } from '../types'
import Web3 from 'web3'
import { CONTRACTS_ADDRESSES, RPC_PROVIDER } from '../contracts/config'
import { abi } from '../contracts/abi/MaskhumanV2.json'
import { AbiItem } from 'web3-utils'
export { BigNumber }

export class Helper {
  static nftAssetsCall(apiConfig: ElementAPIConfig = { networkName: Network.Main }) {
    const networkName = apiConfig.networkName
    const web3 = new Web3(RPC_PROVIDER[networkName])
    const abiInterface = abi as AbiItem[]
    return new web3.eth.Contract(abiInterface, CONTRACTS_ADDRESSES[networkName].NftAsset)
  }

  static makeBigNumber(arg: number | string | BigNumber): BigNumber {
    // Zero sometimes returned as 0x from contracts
    if (arg === '0x') {
      arg = 0
    }
    // fix "new BigNumber() number type has more than 15 significant digits"
    arg = arg.toString()
    return new BigNumber(arg)
  }
}
