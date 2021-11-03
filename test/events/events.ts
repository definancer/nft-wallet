import Web3 from 'web3'
import { Asset } from '../../src/asset'
import { writeCsv } from '../../src/utils/csv'
import secrets from '../../../secrets.json'
import { Network } from '../../src'


(async () => {
  const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)
  const accounts = new Asset(web3,{networkName:Network.Rinkeby})

  try {
    const logs = await accounts.getEvents({ name: 'MintInfo', fromBlock: '9577048' })
    const logCsv = logs.map(val => {
      return {
        blockNumber: val.blockNumber,
        tokenIdStart: val.returnValues.tokenIdStart,
        sender: val.returnValues.tokenIdStart,
        qty: val.returnValues.qty,
        value: val.returnValues.value
      }
    })

    await writeCsv(__dirname + '1.csv', logCsv)

  } catch (e) {
    console.log(e)
  }
})()
