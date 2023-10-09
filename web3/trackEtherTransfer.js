const Web3 = require('web3');
const txRecepit = require('./web3Utils')
const listedAddress = require('../config/whitelistedAddress.json')
const web3 = new Web3('wss://ftm.getblock.io/65e5f4ff-00ef-4ad9-9484-5fcd80b9ffab/testnet/');
const { RoundSchema } = require('../modals/round')
const { TierSchema } = require("../modals/tier");
let count = 0;

const getRound = async () => {
    try {
        const round = await RoundSchema.find();
        if (round) {
            const roundValues = round.map((item) => item.round);
            return roundValues[0]
        } else {
            return { data: null };
        }

    } catch (error) {
        console.log("getRound::", error);
    }
}
const getTier = async () => {
    try {
        const tier = await TierSchema.findOne();
        if (tier) {
            const tierValue1 = tier.tier1;
            const tierValue2 = tier.tier2;
            console.log({ tierValue1: tierValue1, tierValue2: tierValue2 });
            return { data: tierValue1, tierValue2 };
        } else {
            return { data: null };
        }
    } catch (error) {
        console.log("getTier::", error);
        throw error;
    }
};

module.exports = trackEtherTransfer = async () => {
    try {
        console.log(`Tracking cycle #${count}`);
        // Subscribe to pending transactions
        web3.eth.subscribe('pendingTransactions')
            .on('data', async (txHash) => {
                try {
                    // Check if the transaction hash is valid
                    if (web3.utils.isHexStrict(txHash) && txHash.length === 66) {
                        console.log(`Found pending transaction: ${txHash}`);
                        const transaction = await web3.eth.getTransaction(txHash);

                        if (transaction) {
                            // console.log(`Transaction found: ${txHash}`);
                            const receipt = await txRecepit.waitForTransactionReceipt(txHash);

                            if (receipt) {
                                let targetAddress = receipt.from;
                                let round = getRound()
                                if (receipt.status && listedAddress.includes(targetAddress.toLowerCase()) && targetAddress && round == 0) {
                                    const valueInWei = (transaction.value);
                                    const valueInEther = web3.utils.fromWei(valueInWei.toString(), 'ether');
                                    console.log(`Transaction status for ${txHash}: Success`);
                                    console.log(`Ether Transfer from ${targetAddress} to ${receipt.to} for value ${valueInEther}: Success`);
                                    console.log(`Ether Transfer for whitelist round: Success`);

                                } else if (receipt.status && targetAddress ) {

                                }
                                else {
                                    console.log(`Transaction status for ${txHash}: Fail`);
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

