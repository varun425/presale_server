const Web3 = require("web3")
const cron = require('node-cron');

const validateTransaction = require('./validate')
const confirmEtherTransaction = require('./confirm')

function watchEtherTransfers() {
    // Instantiate web3 with WebSocket provider
    console.log("-*****-");
    const web3 = new Web3(new Web3.providers.WebsocketProvider("https://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/"))

    // Instantiate subscription object
    const subscription = web3.eth.subscribe('pendingTransactions')
    // Subscribe to pending transactions
    // console.log(subscription);
    subscription.subscribe((error, result) => {
        // console.log(result);
        if (error) console.log(error)
    })
        .on('data', async (txHash) => {
            try {
                console.log("txHash", txHash);

                // Instantiate web3 with HttpProvider
                const web3Http = new Web3("https://rpc.testnet.fantom.network/")

                // Get transaction details
                const trx = await web3Http.eth.getTransaction(txHash)

                const valid = validateTransaction(trx)
                // If transaction is not valid, simply return
                if (!valid) return

                console.log('Found incoming Ether transaction from ' + "0xFA79C14CDeBF8231Dc3BcC4963D3315d751d558c" + ' to ' + "0x31D0A9A6C679598446245f0a01Ee09e26c1183E3O");
                // console.log('Transaction value is: ' + process.env.AMOUNT)
                console.log('Transaction hash is: ' + txHash + '\n')

                // Initiate transaction confirmation
                confirmEtherTransaction(txHash)

                // Unsubscribe from pending transactions.
                subscription.unsubscribe()
            }
            catch (error) {
                console.log(error)
            }
        })
}


cron.schedule('*/1 * * * * *', () => {
    watchEtherTransfers();
});