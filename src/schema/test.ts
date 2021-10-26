// import { ElementSchemaName, makeBigNumber, Network } from '../../index'
import { encodeParamsCall, encodeReplacementPattern } from './schemaFunctions'
import { AnnotatedFunctionABI } from './types'
import {ContractSchemas} from "../contracts/index"
import Web3 from 'web3'
const web3 = new Web3()


try {
  const contractSchemas = new ContractSchemas(web3)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const abi = contractSchemas.NftExchangeFunc.presaleBuy({
    address: '0x9F7A946d935c8Efc7A8329C0d894A69bA241345A',
    sig:"0xe6884f51771538c78b79d09f3ea0731f9e4b90eccf9cf7403a9152b8e3912165"
  })
  // 0x87953beee6884f51771538c78b79d09f3ea0731f9e4b90eccf9cf7403a9152b8e3912164
  // 0x87953beee6884f51771538c78b79d09f3ea0731f9e4b90eccf9cf7403a9152b8e3912165
  const callData = encodeParamsCall({abi} )
  console.log(callData)


  const pattern = encodeReplacementPattern(abi)
  console.log(pattern)
} catch (e) {
  console.log('ll', e)
}

export const encodeCallNew = (abi: AnnotatedFunctionABI, parameters: any[]): string => {
  // let methodID = web3.eth.abi.encodeFunctionSignature(abi)
  const callData = web3.eth.abi.encodeFunctionCall(abi, parameters)
  // console.log("methodID",callData)
  return callData

  // case FunctionInputKind.Data:
  //         return input.value == '' ? '0x' : input.value
}
