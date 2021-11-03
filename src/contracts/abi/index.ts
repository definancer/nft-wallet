import MaskhumanV2Abi from './MaskhumanV2.json'
import ERC20Abi from './ERC20.json'
import { AbiItem } from 'web3-utils'

export interface AbiInfo {
  contractName?: string
  abi: AbiItem[]
}

export const schemas = {
  erc20: ERC20Abi as AbiInfo,
  nftExchange: MaskhumanV2Abi as AbiInfo,
  asset: MaskhumanV2Abi as AbiInfo
}
