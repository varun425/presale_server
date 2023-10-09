const { WhitelistSchema } = require("../modals/whitelist");
const { PresaleSchema2 } = require("../modals/setting");
const GetMax = async (req, res) => {
    try {
        const { network, investorAddress } = req.query
        const record = await WhitelistSchema.findOne({ network, 'address.whitelistedAddress': investorAddress });
        const tiersMax = await PresaleSchema2.find();
        if (!record) {
            return ({
                code: 404,
                data: null,
                message: "Record not found",
            });
        }
        let tier;
        let isAddressWhitelisted = false
        for (const item of record.address) {
            if (item.whitelistedAddress === investorAddress) {
                tier = item.tier
                isAddressWhitelisted = true
                break;
            }
        }
        if (tier == 1) {

            tier = tiersMax[0].tier1

        } else if (tier == 2) {

            tier = tiersMax[0].tier2

        } else {

            tier = 0
        }

        if (isAddressWhitelisted && tier) {
            return ({
                code: 200,
                data: {
                    tierMax: tier
                }
            });
        } else {
            return ({
                code: 200,
                data: "not whitelisted",
            });
        }
    } catch (error) {
        console.error("Controller Error:", error);
        return ({
            code: 500,
            data: error,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    GetMax,
};