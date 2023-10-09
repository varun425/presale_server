const { InvestSchema } = require('../modals/invest')

const Claim = async (req, res) => {
    try {
        const { investorAddress, txHash } = req.body

        const checkForAddress = await InvestSchema.findOne({ investorAddress: investorAddress })

        if (!checkForAddress) {
            return ({
                code: 404,
                msg: "No investor Found",
                data: checkForAddress
            })
        }

        let claimAbleAmount = checkForAddress.claim.claimAbleToken

        let claimStatus = checkForAddress.claim.isClaimed

        if ((claimAbleAmount != null || claimAbleAmount != 0) && claimStatus == false) {
            checkForAddress.claim.claimAbleToken = 0
            checkForAddress.claim.isClaimed = true
            checkForAddress.claim.claimedToken = claimAbleAmount

            await checkForAddress.save();

            console.log("qwerty");
            return ({
                code: 200,
                msg: `Claimed - for ${investorAddress} amount ${claimAbleAmount} `,
                data: claimAbleAmount
            })
        } else if (claimStatus == true) {
            return ({
                code: 200,
                msg: `Already Claimed - for ${investorAddress} `,
                data: 0
            })
        }


    } catch (error) {
        console.error("API Error:", error);
        if (error.name === "ValidationError") {
            return ({
                code: 400,
                message: "Bad Request - Validation error",
                error: error.message,
            });
        } else if (error.name === "MongoError" && error.code === 11000) {
            return ({
                code: 409,
                message: "Conflict - Duplicate wallet address",
                error: error.message,
            });
        } else {
            return ({
                code: 500,
                message: 'Internal Server Error - An error occurred while processing your request',
                error: error.message,
            });
        }
    }

}
module.exports = {
    Claim
}