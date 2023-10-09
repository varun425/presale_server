const Web3 = require('web3');
const cron = require('node-cron');

// Replace with your Ethereum node URL
const web3 = new Web3('wss://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/');

// Specify the Ethereum addresses you want to track
const arrayOfAddresses = [
    '0xfa79c14cdebf8231dc3bcc4963d3315d751d558c',
    '0x31d0a9a6c679598446245f0a01ee09e26c1183e3',
    '0x8b80805b94286abb973cc0cdfe13d0e9f88dc394',
    '0x8675832492cc8e0a21ac4a9ed266786012a51fd5'
];

async function trackEtherTransfers() {
    try {
        const pendingTransactions = await web3.eth.getPastLogs({
            fromBlock: 'latest',
            toBlock: 'pending',
            topics: ['0x'],
        });

        for (const transaction of pendingTransactions) {
            const targetAddress = transaction.address.toLowerCase();

            if (arrayOfAddresses.includes(targetAddress)) {
                const transactionData = await web3.eth.getTransaction(transaction.transactionHash);
                const receipt = await web3.eth.getTransactionReceipt(transaction.transactionHash);

                if (receipt.status) {
                    const etherValue = web3.utils.fromWei(transactionData.value, 'ether');
                    console.log(`Received ${etherValue} ETH from ${transactionData.from} to ${transactionData.to}`);
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

cron.schedule('*/1 * * * * *', () => {
    trackEtherTransfers();
});
