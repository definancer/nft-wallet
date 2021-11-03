import { Network } from '../types'

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const GasPrice_NOW = {
  url: 'https://www.gasnow.org/api/v3/gas/price',
  type: 'fast' //standard
}

export const RPC_PROVIDER: { [key: string]: any } = {
  [Network.Rinkeby]: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  [Network.Main]: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
}
export const GasLimitOffset = 1.18

// new 0x501c7c8c20e5c67b5f0da1bf925c2dbc1bcf8e44
export enum RINKEBY_CONTRACTS_ADDRESSES {
  NftExchange = '0x56Df6c8484500dc3E2fe5a02bed70b4969FfaFdB',
  NftAsset = '0x56Df6c8484500dc3E2fe5a02bed70b4969FfaFdB',
  WETH = '0xc778417e063141139fce010982780140aa0cd5ab'
}

export enum MAIN_CONTRACTS_ADDRESSES {
  NftExchange = '0x6d77496b7c143d183157e8b979e47a0a0180e86b',
  NftAsset = '0x6d77496b7c143d183157e8b979e47a0a0180e86b',
  WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  MarketExchange =''
}

export const CONTRACTS_ADDRESSES: { [key: string]: any } = {
  [Network.Rinkeby]: RINKEBY_CONTRACTS_ADDRESSES,
  [Network.Main]: MAIN_CONTRACTS_ADDRESSES
}
