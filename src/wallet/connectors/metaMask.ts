import { ConnectorNames, connectorsByName, ProviderRpcError, ProviderMessage, ProviderConnectInfo } from './index'
import { setAccountCookie, setChainIdCookie, setWindowWeb3, setWalletName } from '../helper'


export const isMetamaskLock = async (): Promise<boolean> => {
  // const {  } = window
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return window.ethereum._metamask.isUnlocked()
}

// 钱包事件注册
export const metaMaskEvents = async (provider: any): Promise<void> => {
  // 链接账户
  provider.on('connect', (connectInfo: ProviderConnectInfo) => {
    console.log('Matemask connect', connectInfo)
  })

  // 断开链接
  provider.on('disconnect', (error: ProviderRpcError) => {
    console.log('Matemask disconnect', error)
  })

  // 更改网络事件
  provider.on('chainChanged', async (walletChainId: string) => {
    console.log('Matemask chainChanged', walletChainId)
    setChainIdCookie(walletChainId)
    window.location.reload()
  })

  // 账户变动事件
  provider.on('accountsChanged', async (accounts: Array<string>) => {
    console.log('Matemask accountsChanged', accounts)
    if (accounts.length > 0) {
      setAccountCookie(accounts)
      // set defaultAccount
      setWindowWeb3(provider, accounts)
      window.location.reload()
    } else {
      console.log('Matemask accountsChanged Lock')
    }
    window.location.reload()
  })

  provider.on('message', (payload: ProviderMessage) => {
    console.log('Matemask RPC message', payload)
  })
}


export const onConnectMetaMask = async (ethereum: any): Promise<{ accounts: Array<string>; walletChainId: string }> => {

  // eslint-disable-next-line no-useless-catch
  try {
    // 请求会触发解锁窗口
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const walletChainId = await ethereum.request({ method: 'eth_chainId' })
    console.log('wallet isConnected', ethereum.isConnected())

    console.log('wallet isConnected', accounts)

    if (ethereum.isConnected()) {
      setAccountCookie(accounts)
      setChainIdCookie(walletChainId)
      // 设置web3默认账户
      setWindowWeb3(ethereum, accounts)
      // 增加监听事件
      metaMaskEvents(ethereum)
      // 记录本次打开
      setWalletName(ConnectorNames.Metamask)
    } else {
      console.log(ethereum)
    }
    return { accounts, walletChainId }
  } catch (error: any) {
    // console.error(error)
    throw error
  }
}

export const metamaskProvider = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return window.ethereum
}
