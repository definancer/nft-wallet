
import {Network} from "../types";

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const GasPrice_NOW = {
    url: 'https://www.gasnow.org/api/v3/gas/price',
    type: 'fast' //standard
}
export const GasLimitOffset = 1.18
export const PricePerToken = "20000"

export enum RINKEBY_CONTRACTS_ADDRESSES {
    NftExchange = '0x5E3bA2a774710E369CE85AE2334e79748AE40092',
    NftAsset = '0x5E3bA2a774710E369CE85AE2334e79748AE40092',
    WETH = '0xc778417e063141139fce010982780140aa0cd5ab'
}

export enum MAIN_CONTRACTS_ADDRESSES {
    NftExchange = '?',
    NftAsset = '?',
    WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
}

export const CONTRACTS_ADDRESSES: { [key: string]: any } = {
    [Network.Rinkeby]: RINKEBY_CONTRACTS_ADDRESSES,
    [Network.Main]: MAIN_CONTRACTS_ADDRESSES
}
