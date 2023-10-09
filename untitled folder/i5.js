const ethers = require('ethers');
const cron = require('node-cron');

// Initialize an Ethereum provider
const provider = new ethers.providers.JsonRpcProvider('wss://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/');

const targetAddress = '0xfa79c14cdebf8231dc3bcc4963d3315d751d558c'; // Replace with the address you want to track

let listenersSet = false; // Flag to check if listeners are already set

// Function to set up event listeners
function setupListeners() {
    // Subscribe to incoming transactions
    provider.on('pending', async (tx) => {
        const receipt = await provider.getTransactionReceipt(tx);
        console.log(receipt);
        if (receipt && receipt.from === targetAddress) {
            console.log(`Incoming Ether transfer: ${ethers.utils.formatEther(receipt.value)} ETH`);
            console.log(`From: ${receipt.from}`);
            console.log(`To: ${receipt.to}`);
        }
    });

    // Subscribe to outgoing transactions
    provider.on('tx', async (tx) => {
        const transaction = await provider.getTransaction(tx);
        if (transaction.from === targetAddress) {
            console.log(`Outgoing Ether transfer: ${ethers.utils.formatEther(transaction.value)} ETH`);
            console.log(`From: ${transaction.from}`);
            console.log(`To: ${transaction.to}`);
        }
    });

    listenersSet = true;
}

// Schedule the cron job to set up listeners if they are not already set
cron.schedule('*/1 * * * * *', () => {
    if (!listenersSet) {
        setupListeners();
    }
});
