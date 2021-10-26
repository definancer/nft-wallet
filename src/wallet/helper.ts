import Cookies from 'js-cookie'
import Web3 from 'web3'
import {ConnectorNames} from "./connectors";

export const cookiesName = {
  account: 'wallet_account',
  chainId: 'wallet_chainId',
  walletName: 'wallet_name',
}
export const cookiesDomain = 'element.market'

export const setChainIdCookie = (chainId: string): void => {
  Cookies.set(cookiesName.chainId, chainId, { domain: cookiesDomain })

}

export const setAccountCookie = (accounts: Array<string>): void => {
  const account = accounts[0].toLowerCase()
  Cookies.set(cookiesName.account, account, { domain: cookiesDomain })

}

export const setWalletName = (walletName: ConnectorNames): void => {
  const walletNameCookie = Cookies.get(cookiesName.walletName)
  if (walletName === walletNameCookie) {
    // return walletNameCookie
    Cookies.remove(cookiesName.walletName, { domain: cookiesDomain })
  }
  Cookies.set(cookiesName.walletName, walletName, { domain: cookiesDomain })
}

export const clearWalletCookis = (): void => {
  Cookies.remove(cookiesName.account, { domain: cookiesDomain })
  Cookies.remove(cookiesName.chainId, { domain: cookiesDomain })
}

export const clearWalletNameCookis = (): void => {
  Cookies.remove(cookiesName.walletName, { domain: cookiesDomain })
}

/* ------------------------清理钱包中 reduxStore 的设置------------------------ */


/* ------------------------判断浏览器是否注册web3，可以是任何钱包的------------------------ */
export const isWeb3Installed = (): boolean =>(window as any).nftWeb3 && (window as any).nftWeb3.eth

/* ------------------------判断是否已经连接钱包------------------------ */
export interface WalletUser {
  account: string
  chainId: string
}
export const isConnectedWallet = (): WalletUser | undefined => {
  const account = Cookies.get(cookiesName.account)
  const chainId = Cookies.get(cookiesName.chainId)
  if (account && chainId)
    return {
      account,
      chainId
    }
}

/* ------------------------从Cookies中去获取钱包相关信息------------------------ */
export interface WalletCookies {
  account: string
  chainId: string
  walletName: string | undefined
  walletProvider: any
}
export const getCookiesWallet = (): WalletCookies | false => {
  const account = Cookies.get(cookiesName.account)
  const chainId = Cookies.get(cookiesName.chainId)
  const walletName = Cookies.get(cookiesName.walletName)
  return account && chainId && isWeb3Installed()
    ? {
        account,
        chainId,
        walletName,
        walletProvider:  (window as any).nftWeb3
      }
    : false
}


/* ------------------------验证并且设置web3d default account------------------------ */
export const setWindowWeb3 = (provider: any, accounts: Array<string>): Web3 => {
  const newWeb3 = new Web3(provider)
  if (accounts.length > 0) {
    // @ts-ignore
    newWeb3.eth.defaultAccount = accounts[0].toLowerCase()
    (window as any).nftWeb3 = newWeb3
  }
  return newWeb3
}

