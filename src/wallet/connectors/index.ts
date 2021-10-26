import { walletConnectProvider } from './walletConnect'
import { metamaskProvider } from './metaMask'

export enum ConnectorNames {
  Metamask = 'Metamask',
  ImToken = 'ImToken',
  MathWallet = 'MathWallet',
  TokenPocket = 'TokenPocket',
  WalletConnect = 'WalletConnect'
}

// https://eips.ethereum.org/EIPS/eip-1193#disconnect
export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

export interface ProviderMessage {
  type: string
  data: unknown
}

export interface EthSubscription extends ProviderMessage {
  readonly type: 'eth_subscription'
  readonly data: {
    readonly subscription: string
    readonly result: unknown
  }
}

export interface ProviderConnectInfo {
  readonly chainId: string
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.TokenPocket]: metamaskProvider,
  [ConnectorNames.ImToken]: metamaskProvider,
  [ConnectorNames.MathWallet]: metamaskProvider,
  [ConnectorNames.Metamask]: metamaskProvider,
  [ConnectorNames.WalletConnect]: walletConnectProvider
}

// 刷新页面，程序初始化时，初始化web3--->否则比如在创建NFT页面时，刷新页面，已经连接钱包情况下，但由于没有初始化web3，又弹出了钱包链接界面
// 随着钱包支持数量增加而增加
// export const pageLoadedInitWeb3 = (): void => {
//   if (isWeb3Installed()) return
//   const account = Cookies.get(cookiesName.account)
//   const chainId = Cookies.get(cookiesName.chainId)
//   const walletName = Cookies.get(cookiesName.walletName)
//
//   if (!account || !chainId || !walletName) return
//
//   if (walletName === ConnectorNames.Metamask) {
//     const ethereum = connectorsByName.Metamask()
//     setWindowWeb3(ethereum, [account])
//   }
//
//   if (walletName === ConnectorNames.WalletConnect) {
//     const provider = connectorsByName.WalletConnect(chainId)
//     setWindowWeb3(provider, [account])
//   }
// }
