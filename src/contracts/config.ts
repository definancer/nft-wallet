import {Network} from '../../index'

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const GasPrice_NOW = {
    url: 'https://www.gasnow.org/api/v3/gas/price',
    type: 'fast' //standard
}
export const GasLimitOffset = 1.18
export const PricePerToken = "20000"

export enum RINKEBY_CONTRACTS_ADDRESSES {
    NftExchange = '0x500Ee8671808EAAd6086FFBCF6F072F574e63b39',
    NftAsset = '0x545fB5D50db78900090e9F62c08FFA94800efa55',
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
