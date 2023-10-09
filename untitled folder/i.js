// const Web3 = require('web3');
// const cron = require('node-cron');
// const addressToCheck = '0xfa79c14cdebf8231dc3bcc4963d3315d751d558c'; 

// const web3 = new Web3("wss://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/");

// async function checkTransactions() {
//     try {
//         const block = await web3.eth.getBlock('latest');
//         const transactions = block.transactions;

//         if (block && transactions) {
//             for (let txHash of transactions) {
//                 const tx = await web3.eth.getTransaction(txHash);

//                 if (addressToCheck === tx.from.toLowerCase()) {
//                     console.log("From: " + tx.from.toLowerCase() + " To: " + tx.to.toLowerCase() + " Value: " + tx.value);
//                 }

//             }
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// cron.schedule('*/1 * * * * *', () => {
//     checkTransactions();
// });
const Web3 = require('web3');
const cron = require('node-cron');

// Replace with your Ethereum node URL
const web3 = new Web3('wss://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/');

// Specify the Ethereum address you want to track
const arrOfAddrees = [
    '0xfa79c14cdebf8231dc3bcc4963d3315d751d558c',
    '0x31d0a9a6c679598446245f0a01ee09e26c1183e3',
    '0x8b80805b94286abb973cc0cdfe13d0e9f88dc394',
    '0x8675832492cc8e0a21ac4a9ed266786012a51fd5'
]; 
function trackEtherTransfers() {
    try {
        web3.eth.subscribe('pendingTransactions', (error, result) => {
            if (!error ) {
                web3.eth.getTransaction(result, async (error, transaction) => {
                    if (!error && result != null) {
                        let targetAddress = transaction.from;
                        web3.eth.getTransactionReceipt(result, async (error, receipt) => {
                        console.log(receipt);
                            if (!error ) {
                                if (
                                    targetAddress &&
                                    arrOfAddrees.includes(targetAddress.toLowerCase()) &&
                                    receipt.status ==  true // Check if the transaction was successful
                                ) {
                                    const etherValue = web3.utils.fromWei(
                                        transaction.value,
                                        'ether'
                                    );
                                    console.log(
                                        `Received ${etherValue} ETH from ${transaction.from}`
                                    );

                                }
                            } else {
                                console.error('Error fetching receipt:', error);
                            }
                        });
                    } else {
                        console.error('Error fetching transaction details:', error);
                    }
                });
            } else {
                console.error('Error subscribing to pending transactions:', error);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

cron.schedule('*/1 * * * * *', () => {
    trackEtherTransfers();
});
