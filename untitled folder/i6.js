const Web3 = require('web3');
const BN = require('web3')
const cron = require('node-cron');

const web3 = new Web3('wss://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/');

const arrOfAddrees = [
    '0xfa79c14cdebf8231dc3bcc4963d3315d751d558c',
    '0x31d0a9a6c679598446245f0a01ee09e26c1183e3',
    '0x8b80805b94286abb973cc0cdfe13d0e9f88dc394',
    '0x8675832492cc8e0a21ac4a9ed266786012a51fd5'
];

let count = 0;

const trackEtherTransfer = () => {
    try {
        console.log(`Tracking cycle #${count}`);

        // Subscribe to pending transactions
        web3.eth.subscribe('pendingTransactions')
            .on('data', async (txHash) => {
                try {
                    // Check if the transaction hash is valid
                    if (web3.utils.isHexStrict(txHash) && txHash.length === 66) {
                        // console.log(`Found pending transaction: ${txHash}`);
                        const transaction = await web3.eth.getTransaction(txHash);

                        if (transaction) {
                            // console.log(`Transaction found: ${txHash}`);
                            const receipt = await waitForTransactionReceipt(txHash);

                            if (receipt) {
                                let targetAddress = receipt.from;
                                if (receipt.status && arrOfAddrees.includes(targetAddress.toLowerCase()) && targetAddress) {
                                    const valueInWei = (transaction.value);
                                    const valueInEther = web3.utils.fromWei(valueInWei.toString(), 'ether');
                                    console.log(`Transaction status for ${txHash}: Success`);
                                    console.log(`Ether Transfer from ${targetAddress} to ${receipt.to} for value ${valueInEther}: Success`);

                                } else {
                                    // console.log(`Transaction status for ${txHash}: Fail`);
                                }
                            } else {
                                console.log(`Transaction receipt not found for ${txHash} yet.`);
                            }
                        } else {
                            console.log(`Transaction not found for ${txHash}.`);
                        }
                    } else {
                        console.log(`Invalid transaction hash: ${txHash}`);
                    }
                } catch (error) {
                    console.error('Error fetching transaction:', error);
                }
            })
            .on('error', (error) => {
                console.error('Error in subscription:', error);
            });

        count++;
    } catch (error) {
        console.error('Error in trackEtherTransfer:', error);
    }
};

// Function to wait for the transaction receipt
async function waitForTransactionReceipt(txHash, maxRetries = 10, delayMs = 1000) {
    let retries = 0;
    while (retries < maxRetries) {
        const receipt = await web3.eth.getTransactionReceipt(txHash);
        if (receipt) {
            return receipt;
        }
        await sleep(delayMs);
        retries++;
    }
    return null;
}

// Function to add a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

cron.schedule('*/1 * * * * *', () => {
    trackEtherTransfer();
});
