import { BigNumber } from './constants'
import {Asset, ECSignature, ExchangeMetadata, UnhashedOrder, UnsignedOrder} from '../types'
import {ElementError} from "../base/error";

export function toBaseUnitAmount(amount: BigNumber, decimals: number): BigNumber {
  const unit = new BigNumber(10).pow(decimals)
  return amount.times(unit).integerValue()
}

// 获得ElementAssetStore tokenid对应的URI
export const getElementAssetURI = async (contract: any, tokenId: string) => {
  const overURI = await contract.elementSharedAsset.methods._getOverrideURI(tokenId).call()
  const URI = await contract.elementSharedAsset.methods.uri(tokenId).call()
  return { overURI, URI }
}

export function assetToMetadata(asset: Asset, quantity: string): ExchangeMetadata {
  const orderMetadata: ExchangeMetadata = {
    asset: {
      id: asset.tokenId,
      address: asset.tokenAddress,
      quantity
    },
    schema: asset.schemaName
  }
  return orderMetadata
}

export function makeBigNumber(arg: number | string | BigNumber): BigNumber {
  // Zero sometimes returned as 0x from contracts
  if (arg === '0x') {
    arg = 0
  }
  // fix "new BigNumber() number type has more than 15 significant digits"
  arg = arg.toString()
  return new BigNumber(arg)
}

export async function web3Sign(web3: any, msg: string, account: string): Promise<string> {
  // eslint-disable-next-line no-useless-catch
  try {
    let signatureRes
    // console.log('web3Sign', msg)
    if (typeof window === 'undefined') {
      return web3.eth.sign(msg, account)
    }

    if (web3.eth.accounts.wallet.length > 0) {
      return web3.eth.sign(msg, account)
    }

    if (web3.eth.defaultAccount.toLowerCase() == account.toLowerCase()) {
      signatureRes = await web3.eth.personal.sign(msg, account)
    } else {
      throw new ElementError({
        code: '1000',
        message: 'web3.eth.defaultAccount and maker not equal'
      });
    }
    return signatureRes
  } catch (error) {
    throw error
  }
}

// 登陆签名
export async function elementSignInSign(
  walletProvider: any,
  nonce: number,
  account: string
): Promise<{ message: string; signature: string }> {
  const message = `Welcome to Element!
   \nClick "Sign" to sign in. No password needed!
   \nI accept the Element Terms of Service: \n https://element.market/tos
   \nWallet address:\n${account}
   \nNonce:\n${nonce}`
  const signature = await web3Sign(walletProvider, message, account)
  return { message, signature }
}

export async function getAccountBalance(web3: any, account: string, erc20?: any): Promise<any> {
  const ethBal: number = await web3.eth.getBalance(account, 'latest').catch((error: any) => {
    const stack = error.message || JSON.stringify(error)
    throw new ElementError({
      code: '2003',
      context: { funcName: 'getAccountBalance.getBalance ', stack }
    })
  })
  let erc20Bal = 0
  if (erc20) {
    erc20Bal = await erc20.methods
      .balanceOf(account)
      .call()
      .catch((error: any) => {
        const stack = error.message || JSON.stringify(error)
        throw new ElementError({
          code: '2002',
          context: { funcName: 'getAccountBalance.balanceOf ', stack }
        })
      })
  }
  return { ethBal: Number(ethBal), erc20Bal: Number(erc20Bal) }
}

export async function getTokenIDOwner(elementAssetContract: any, tokenId: any): Promise<string> {
  // token id 的 creator
  // let exists = await elementAssetContract.methods.exists(tokenId).call()
  return elementAssetContract.methods.creator(tokenId).call()
}


export function hashOrder(web3: any, order: UnhashedOrder): string {
  return web3.utils
    .soliditySha3(
      { type: 'address', value: order.exchange },
      { type: 'address', value: order.maker },
      { type: 'address', value: order.taker },
      { type: 'uint256', value: order.makerRelayerFee },
      { type: 'uint256', value: order.takerRelayerFee },
      { type: 'uint256', value: order.takerProtocolFee },
      { type: 'uint256', value: order.takerProtocolFee },
      { type: 'address', value: order.feeRecipient },
      { type: 'uint8', value: order.feeMethod },
      { type: 'uint8', value: order.side },
      { type: 'uint8', value: order.saleKind },
      { type: 'address', value: order.target },
      { type: 'uint8', value: order.howToCall },
      { type: 'bytes', value: order.dataToCall },
      { type: 'bytes', value: order.replacementPattern },
      { type: 'address', value: order.staticTarget },
      { type: 'bytes', value: order.staticExtradata },
      { type: 'address', value: order.paymentToken },
      { type: 'uint256', value: order.basePrice },
      { type: 'uint256', value: order.extra },
      { type: 'uint256', value: order.listingTime },
      { type: 'uint256', value: order.expirationTime },
      { type: 'uint256', value: order.salt }
    )
    .toString('hex')
}

export function orderParamsEncode(order: UnhashedOrder): Array<any> {
  const orderParamKeys = [
    'exchange',
    'maker',
    'taker',
    'makerRelayerFee',
    'takerRelayerFee',
    'makerProtocolFee',
    'takerProtocolFee',
    'feeRecipient',
    'feeMethod',
    'side',
    'saleKind',
    'target',
    'howToCall',
    'dataToCall',
    'replacementPattern',
    'staticTarget',
    'staticExtradata',
    'paymentToken',
    'basePrice',
    'extra',
    'listingTime',
    'expirationTime',
    'salt'
  ]
  const orerParamValueArray = []
  for (const key of orderParamKeys) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let val = order[key]
    if (val === undefined) {
      console.log('orderParamsEncode key undefined', key)
      continue
    }
    if (BigNumber.isBigNumber(val)) {
      val = val.toString()
    }

    orerParamValueArray.push(val)
  }
  return orerParamValueArray
}

export function orderSigEncode(order: ECSignature): Array<any> {
  const orderSigKeys = ['v', 'r', 's']
  const orderSigValueArray = []
  for (const key of orderSigKeys) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (order[key] === undefined) {
      console.log('orderSigEncode key undefined', key)
      continue
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    orderSigValueArray.push(order[key])
  }
  return orderSigValueArray
}


