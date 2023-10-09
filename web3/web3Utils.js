// Function to wait for the transaction receipt
const Web3 = require('web3');
const web3 = new Web3('wss://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/');

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
module.exports = {
    waitForTransactionReceipt,
    sleep,
};




