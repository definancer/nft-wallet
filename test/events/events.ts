import Web3 from 'web3'
import {Account} from '../../src/account'
import {writeCsv} from '../../src/utils/csv'
import secrets from '../../../secrets.json'


(async () => {
    const rpcUrl = `https://rinkeby.infura.io/v3/${secrets.infuraKey}`
    const web3 = new Web3(rpcUrl)
    const accounts = new Account(web3)

    try {
        // const res = await accounts.saleLive()
        const logs = await accounts.getMintInfoEvents()

        const logCsv = logs.map(val=>{
            return {
                blockNumber:val.blockNumber,
                tokenIdStart: val.returnValues.tokenIdStart,
                sender: val.returnValues.tokenIdStart,
                qty:val.returnValues.qty,
                value:val.returnValues.value,
            }
        })

        await writeCsv(__dirname+"1.csv",logCsv)


        // const hashAddr =  web3.utils.sha3(account2.address)
        // const web3AccountSignature = await web3.eth.accounts.sign(hashAddr||"", account1.privateKey||"");
        //
        // const sig = web3AccountSignature.signature
        // const res = await accounts.presaleBuy(sig)

        //



    } catch (e) {
        console.log(e)
    }
})()
