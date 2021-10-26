import {
    AbiType,
    FunctionInputKind,
    StateMutability,
    AnnotatedFunctionABI,
    EventInputKind, AnnotatedEventABI
} from '../../../types'

export interface SchemaEvents<T> {
    transfer: Array<AnnotatedEventABI<T>>
}

export interface NftExchangeSchema<T> {
    functions: {
        presaleBuy: (asset: T) => AnnotatedFunctionABI
        publicBuy: (asset: T) => AnnotatedFunctionABI
    },
    events: SchemaEvents<T>
}

export interface Exchange {
    address: string
    sig?: string
    qty?: string
}

// const presaleBuy = {
//     "inputs": [
//         {
//             "internalType": "bytes",
//             "name": "sig",
//             "type": "bytes"
//         }
//     ],
//     "name": "presaleBuy",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
// }
// const publicBuy = {
//     "inputs": [
//         {
//             "internalType": "uint256",
//             "name": "qty",
//             "type": "uint256"
//         }
//     ],
//     "name": "publicBuy",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
// }
export const NftExchangeSchemas: Required<Pick<NftExchangeSchema<Exchange>, 'functions' | "events">> = {
    functions: {
        presaleBuy: (asset) => ({
            type: AbiType.Function,
            name: 'presaleBuy',
            payable: false,
            constant: false,
            stateMutability: StateMutability.Nonpayable,
            target: asset.address,
            inputs: [
                {kind: FunctionInputKind.Data, name: 'sig', type: 'bytes', value: asset.sig}
            ],
            outputs: []
        }),
        publicBuy: (asset) => ({
            type: AbiType.Function,
            name: 'publicBuy',
            payable: true,
            constant: false,
            stateMutability: StateMutability.Payable,
            target: asset.address,
            inputs: [{kind: FunctionInputKind.Data, name: 'qty', type: 'uint256', value: asset.qty}],
            outputs: []
        })
    },
    events: {
        transfer: [
            {
                type: AbiType.Event,
                name: 'MintInfo',
                anonymous: false,
                inputs: [
                    {
                        "indexed": true,
                        "name": "tokenIdStart",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "qty",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }

                ],
                assetFromInputs: async (inputs: any) => inputs.tokenIdStart
            }
        ]
    }
}
