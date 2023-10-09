const Web3 = require('web3');
const cron = require('node-cron');

const web3 = new Web3('wss://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/');

const addressToTrack = '0xfa79c14cdebf8231dc3bcc4963d3315d751d558c';
const arrOfAddrees = [
    '0xfa79c14cdebf8231dc3bcc4963d3315d751d558c',
    '0x31D0A9A6C679598446245f0a01Ee09e26c1183E3',
    '0x8b80805b94286ABb973cc0CDFE13d0e9f88dc394',
    '0x8675832492Cc8E0A21AC4A9ed266786012a51Fd5'
]
function trackEtherTransfers() {
    try {
        console.log("ii");
        web3.eth.subscribe('pendingTransactions', (error, result) => {
            if (!error) {
                web3.eth.getTransaction(result, async (error, transaction) => {
                    if (!error) {

                        let targetAddress = transaction.from;
                        if (arrOfAddrees.includes(targetAddress.toLowerCase())) {
                            const etherValue = web3.utils.fromWei(
                                transaction.value,
                                'ether'
                            );
                            console.log(
                                `Received ${etherValue} ETH from ${transaction.from}`
                            );
                            // Handle the incoming ETH transfer as needed
                        }
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
