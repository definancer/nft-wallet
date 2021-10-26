import Web3 from 'web3'
import {Account} from '../src/account'
// @ts-ignore
import secrets from '../../secrets.json';
import {EventData} from "web3-eth-contract";

(async () => {
    const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
    const web3 = new Web3(rpcUrl)

    const account1 = web3.eth.accounts.wallet.add(secrets.accounts['0x0A56b3317eD60dC4E1027A63ffbE9df6fb102401'])
    const account2 = web3.eth.accounts.wallet.add(secrets.accounts['0xeb1e5B96bFe534090087BEb4FB55CC3C32bF8bAA'])
    const defaultAddr = account2.address.toLowerCase()

    web3.eth.defaultAccount = defaultAddr
    const accounts = new Account(web3)

    try {
        // const res = await accounts.saleLive()
        // const res = await accounts.getMintInfoEvents()
        // const res = await accounts.publicBuy("1")
        // const res = await accounts.changePrice()

        const hashAddr =  web3.utils.sha3(account2.address)
        const web3AccountSignature = await web3.eth.accounts.sign(hashAddr||"", account1.privateKey||"");

        const sig = web3AccountSignature.signature
        const res = await accounts.presaleBuy(sig)

        //
        res.txSend.on("confirmation", async (num, tx, error) => {
            console.log(num)
            // const price = await accounts.pricePerToken()
            // console.log(price)
            const events: Array<EventData> = await accounts.getMintInfoEvents()
            for (const event of events) {
                console.log(event.blockNumber, event.returnValues)
            }
            //

        })


    } catch (e) {
        console.log(e)
    }
})()
