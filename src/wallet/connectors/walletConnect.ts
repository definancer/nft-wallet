import WalletConnectProvider from '@walletconnect/web3-provider'
// eslint-disable-next-line import/no-extraneous-dependencies
import { IConnector, IClientMeta, IWalletConnectSession } from '@walletconnect/types'
// eslint-disable-next-line import/no-extraneous-dependencies
import WalletConnectClient from '@walletconnect/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import QRCodeModal from '@walletconnect/qrcode-modal'
import Cookies from 'js-cookie'
import { ConnectorNames } from './index'
import {
  setAccountCookie,
  setChainIdCookie,
  clearWalletCookis,
  setWindowWeb3,
  setWalletName,
  clearWalletNameCookis, cookiesName
} from '../helper'


const POLLING_INTERVAL = 26000 // 12000
const jsonRpc = "/api/v1/jsonrpc"
const bridge = "/bridge/walletconnect"

// owner
// 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
const RPC_URLS: { [chainId: number]: string } = {
  1: jsonRpc,
  4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', //
  137: 'https://rpc-mainnet.maticvigil.com', //
  80001: 'https://rpc-mumbai.matic.today'
}

// https://bridge.element.market
// http://47.75.58.188:5001
// http://10.0.5.58:5001
export const walletConnectProvider = (chainId: number, walletSession?: IWalletConnectSession): WalletConnectProvider => {
  console.log('Web3 Wallet Connect Provider', Number(chainId))

  const walletConnectClient: IConnector = walletSession
    ? new WalletConnectClient({ session: walletSession })
    : new WalletConnectClient({ bridge, qrcodeModal: QRCodeModal })


  return new WalletConnectProvider({
    pollingInterval: POLLING_INTERVAL,
    rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4],137: RPC_URLS[137],80001: RPC_URLS[80001] },
    chainId: Number(chainId),
    connector: walletConnectClient
  })
}

// 订阅事件
export const subscribeToEvents = (provider: any) => {
  const connector = provider.wc
  console.log('subscribeToEvents')
  if (!connector) {
    return
  }

  connector.on('upgrade', async (error: any, payload: any) => {
    // 钱包操作
    console.log(`connector.on("upgrade")`, payload)
    if (error) {
      throw error
    }
  })

  connector.on('session_update', async (error: any, payload: any) => {
    // 钱包操作
    console.log(`connector.on("session_update")`, payload)
    if (error) {
      throw error
    }
  })

  connector.on('connect', (error: any, payload: any) => {
    console.log(`connector.on("connect")`, payload)
    const { chainId, accounts } = connector
    const chainIdStr = `0x${chainId.toString(16)}`
    setChainIdCookie(chainIdStr)
    setAccountCookie(accounts)
    setWindowWeb3(provider, accounts)
    setWalletName(ConnectorNames.WalletConnect)

    if (error) {
      throw error
    }
  })

  connector.on('disconnect', async (error: any, payload: any) => {
    console.log(`connector.on("disconnect")`, payload)
    clearWalletCookis()
    clearWalletNameCookis()
    if (error) {
      throw error
    }
  })

  // const walletSession: string | null = localStorage.getItem('walletconnect')

  if (connector.connected) {
    console.log('connector.connected')
    const { chainId, accounts } = connector
    const chainIdStr = `0x${chainId.toString(16)}`
    setChainIdCookie(chainIdStr)
    setAccountCookie(accounts)
    setWindowWeb3(provider, accounts)
    setWalletName(ConnectorNames.WalletConnect)
  }
}

const qrCodeModalCallback = (res: any) => {
  clearWalletNameCookis()
  console.log('close model callback', res)
}

// 链接钱包
export const onWalletConnect = async (
  { chainId, isDisconnect = true }:
    { chainId: number, isDisconnect?: boolean })
  : Promise<boolean> => {
  let provider: WalletConnectProvider
  const walletSession: string | null = localStorage.getItem('walletconnect')
  try {
    if (walletSession) {
      const session: IWalletConnectSession = JSON.parse(walletSession)
      console.log('onWalletConnect by session')
      provider = walletConnectProvider(chainId, session)
    } else {
      provider = walletConnectProvider(chainId)
    }
    await provider.enable() // break the process
    subscribeToEvents(provider)
    return true
  } catch (error) {
    if (error.message === 'User closed modal') {
      console.log('User closed modal')
      clearWalletNameCookis()
    }
    return false
  }
}

export const getWalletInfo = (): IClientMeta | null | void => {
  const walletName = Cookies.get(cookiesName.walletName);
  if (walletName === ConnectorNames.WalletConnect) {
    const walletSession: string | null = localStorage.getItem('walletconnect')
    if (walletSession) {
      const session: IWalletConnectSession = JSON.parse(walletSession)
      return session.peerMeta
    }
  }
}

