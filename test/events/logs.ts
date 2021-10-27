import {writeCsv} from '../../src/utils/csv'
const logs =[
  {
    "address": "0x500Ee8671808EAAd6086FFBCF6F072F574e63b39",
    "blockHash": "0x303c22a2f889bafc0d069be6f1b5d14d27efb05b2d8f2d1013bfd6ceda84bb3e",
    "blockNumber": 9527349,
    "logIndex": 108,
    "removed": false,
    "transactionHash": "0x6af3f193e9dfbb94afdffe230930436dd1e09271994d2c1b3eb6109633ecb336",
    "transactionIndex": 61,
    "id": "log_1e32c97f",
    "returnValues": {
      "0": "1",
      "1": "0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401",
      "2": "1",
      "3": "0",
      "tokenIdStart": "1",
      "sender": "0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401",
      "qty": "1",
      "value": "0"
    },
    "event": "MintInfo",
    "signature": "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
    "raw": {
      "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000",
      "topics": [
        "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000a56b3317ed60dc4e1027a63ffbe9df6fb102401"
      ]
    }
  },
  {
    "address": "0x500Ee8671808EAAd6086FFBCF6F072F574e63b39",
    "blockHash": "0x397fcb42f710a12a2309dfaf517c1f38003e05d1b4ecc7ad66115203f9d25fe0",
    "blockNumber": 9531571,
    "logIndex": 64,
    "removed": false,
    "transactionHash": "0x1571de3ce1402960cfad0e5c2fb804102a8893513cab409d84055b2f48a7c325",
    "transactionIndex": 31,
    "id": "log_a1606fb9",
    "returnValues": {
      "0": "2",
      "1": "0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401",
      "2": "1",
      "3": "20000",
      "tokenIdStart": "2",
      "sender": "0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401",
      "qty": "1",
      "value": "20000"
    },
    "event": "MintInfo",
    "signature": "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
    "raw": {
      "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000004e20",
      "topics": [
        "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
        "0x0000000000000000000000000000000000000000000000000000000000000002",
        "0x0000000000000000000000000a56b3317ed60dc4e1027a63ffbe9df6fb102401"
      ]
    }
  },
  {
    "address": "0x500Ee8671808EAAd6086FFBCF6F072F574e63b39",
    "blockHash": "0xb3ed3dee7cc478f73cebbf9ec8a18c03bc7f96d6b38bd7da6182a568352c9ca0",
    "blockNumber": 9531647,
    "logIndex": 54,
    "removed": false,
    "transactionHash": "0x444cb082ed9129ee270be9d9f7c31901499b60306dd23deb0eb2e413dd962c45",
    "transactionIndex": 35,
    "id": "log_6e236b06",
    "returnValues": {
      "0": "3",
      "1": "0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA",
      "2": "1",
      "3": "0",
      "tokenIdStart": "3",
      "sender": "0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA",
      "qty": "1",
      "value": "0"
    },
    "event": "MintInfo",
    "signature": "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
    "raw": {
      "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000",
      "topics": [
        "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
        "0x0000000000000000000000000000000000000000000000000000000000000003",
        "0x000000000000000000000000eb1e5b96bfe534090087beb4fb55cc3c32bf8baa"
      ]
    }
  },
  {
    "address": "0x500Ee8671808EAAd6086FFBCF6F072F574e63b39",
    "blockHash": "0xe522b072e0184f4cb46e1d3508bae2c2f744e8f8b78962e82a77e0648813c718",
    "blockNumber": 9531834,
    "logIndex": 142,
    "removed": false,
    "transactionHash": "0x35da714e45e7326120b0392acbb3f76a2360daab8cca593260334a437f703cc3",
    "transactionIndex": 45,
    "id": "log_f24df082",
    "returnValues": {
      "0": "4",
      "1": "0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401",
      "2": "1",
      "3": "20000",
      "tokenIdStart": "4",
      "sender": "0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401",
      "qty": "1",
      "value": "20000"
    },
    "event": "MintInfo",
    "signature": "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
    "raw": {
      "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000004e20",
      "topics": [
        "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
        "0x0000000000000000000000000000000000000000000000000000000000000004",
        "0x0000000000000000000000000a56b3317ed60dc4e1027a63ffbe9df6fb102401"
      ]
    }
  },
  {
    "address": "0x500Ee8671808EAAd6086FFBCF6F072F574e63b39",
    "blockHash": "0x4c01600cecc180874e12848b2f43fa61b07ea7fa274ed3165f66b391b5764621",
    "blockNumber": 9531841,
    "logIndex": 96,
    "removed": false,
    "transactionHash": "0x5535fd1659d129a004a849a361098dd28422f8f37008fa8b72f1d508c7c9dadf",
    "transactionIndex": 46,
    "id": "log_2edd1a95",
    "returnValues": {
      "0": "5",
      "1": "0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA",
      "2": "1",
      "3": "20000",
      "tokenIdStart": "5",
      "sender": "0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA",
      "qty": "1",
      "value": "20000"
    },
    "event": "MintInfo",
    "signature": "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
    "raw": {
      "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000004e20",
      "topics": [
        "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
        "0x0000000000000000000000000000000000000000000000000000000000000005",
        "0x000000000000000000000000eb1e5b96bfe534090087beb4fb55cc3c32bf8baa"
      ]
    }
  },
  {
    "address": "0x500Ee8671808EAAd6086FFBCF6F072F574e63b39",
    "blockHash": "0xefa44a58ae027796823f02a13d5389c2fdc3e94a714db048df1692e24debb42d",
    "blockNumber": 9531945,
    "logIndex": 66,
    "removed": false,
    "transactionHash": "0x67e9f285cb80f7e1b27b4bbd19897a0813227592dd6d4d646ceab781cbcb2d4e",
    "transactionIndex": 36,
    "id": "log_4ddb7063",
    "returnValues": {
      "0": "6",
      "1": "0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA",
      "2": "1",
      "3": "20000",
      "tokenIdStart": "6",
      "sender": "0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA",
      "qty": "1",
      "value": "20000"
    },
    "event": "MintInfo",
    "signature": "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
    "raw": {
      "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000004e20",
      "topics": [
        "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
        "0x0000000000000000000000000000000000000000000000000000000000000006",
        "0x000000000000000000000000eb1e5b96bfe534090087beb4fb55cc3c32bf8baa"
      ]
    }
  },
  {
    "address": "0x500Ee8671808EAAd6086FFBCF6F072F574e63b39",
    "blockHash": "0x1fbe755d05fa9b25c540abb86106892b34cd923edbe7838815bb64ee8babb2ca",
    "blockNumber": 9532298,
    "logIndex": 19,
    "removed": false,
    "transactionHash": "0x52466f61ff29946a81d49908a84f6e9df974ece3c282705281e9bcc5df30bf9d",
    "transactionIndex": 15,
    "id": "log_04fa2214",
    "returnValues": {
      "0": "7",
      "1": "0xf651788182c6245833D72bA7659c58a02A36a400",
      "2": "1",
      "3": "20000",
      "tokenIdStart": "7",
      "sender": "0xf651788182c6245833D72bA7659c58a02A36a400",
      "qty": "1",
      "value": "20000"
    },
    "event": "MintInfo",
    "signature": "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
    "raw": {
      "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000004e20",
      "topics": [
        "0x7a06b07d099fc78f022d82b9d98fcb6dc78700ae7e311ed452ddfaa2a4a5bb15",
        "0x0000000000000000000000000000000000000000000000000000000000000007",
        "0x000000000000000000000000f651788182c6245833d72ba7659c58a02a36a400"
      ]
    }
  }
]

const logCsv = logs.map(val=>{
  return {
    blockNumber:val.blockNumber,
    tokenIdStart: val.returnValues.tokenIdStart,
    sender: val.returnValues.tokenIdStart,
    qty:val.returnValues.qty,
    value:val.returnValues.value,
  }
})

console.log(logCsv)
writeCsv(__dirname+"1.csv",logCsv)
