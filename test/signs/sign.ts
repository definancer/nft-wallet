import Web3 from 'web3'
import secrets from '../../../secrets.json'
import { writeCsv } from '../../src/utils/csv'

const addressList:string[] = [
  '0xa8309aa15060db048970e2ce94326d547aecd57f',
  '0x5036CD2516d6821Afd3a52C5A9Cf40237db018a4',
  '0xda7C3F1b28C4dc3b0F50E8BC1c632290d49E5eA7',
  '0xFD5FA830042fE100f78844b0B0Ce2Fd313369118',
  '0xff6f09A3dD890D9Ff3DF2f4Be1E60716B0d83347',
  '0x633f6c7E25eE757d12643A32cE1586AC9e8542d5',
  "0xf651788182c6245833D72bA7659c58a02A36a400"
];

(async () => {
  const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
  const web3 = new Web3(rpcUrl)

  const account1 = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])
  const account2 = web3.eth.accounts.wallet.add(secrets.accounts['0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA'])
  const defaultAddr = account2.address.toLowerCase()
  web3.eth.defaultAccount = defaultAddr

  try {

    const logCsv = addressList.map((address:string) => {
      const hashAddr = web3.utils.sha3(address)
      const web3AccountSignature = web3.eth.accounts.sign(hashAddr || '', account1.privateKey || '')

      const signature = web3AccountSignature.signature
      return {
        address,
        signature
      }
    })
    console.log(logCsv)
    await writeCsv(__dirname+"1.csv",logCsv)

  } catch (e) {

  }
})()
