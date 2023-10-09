const { PresaleSchema2 } = require("../modals/setting");

const SetPresaleSetting = async (req, res) => {
    try {

        let {tokenPrice,tier1,tier2,round, investStatus, claimStatus, investStartsIn, claimEndsIn } = req.body;
        if (investStatus == null && claimStatus == null) {
            investStatus = false
            claimStatus = false
        }
        const flag = 1

        let existingRecord = await  PresaleSchema2.findOne({ flag });

        if (!existingRecord) {

            existingRecord = new PresaleSchema2({ 
                tokenPrice:tokenPrice,
                tier1:tier1,
                tier2:tier2,
                round:round,
                investStatus:investStatus,
                claimStatus:claimStatus,
                investStartsIn:investStartsIn,
                claimEndsIn:claimEndsIn,
                flag:flag 
            });

        } else {
            existingRecord.tokenPrice = tokenPrice;

            existingRecord.tier1 = tier1;

            existingRecord.tier2 = tier2;

            existingRecord.round = round;

            existingRecord.investStatus = investStatus;

            existingRecord.claimStatus = claimStatus;

            existingRecord.investStartsIn = investStartsIn;

            existingRecord.claimEndsIn = claimEndsIn;
        }

        const result = await existingRecord.save();

        return ({

            code: 200,

            message: existingRecord.isNew
                ? 'Success - Saved presale setting data as a new record'
                : 'Success - Updated presale setting data',

            data: result,
        });
    } catch (error) {
        console.error("API Error:", error);
        if (error.name === "ValidationError") {
            return ({
                code: 400,
                message: "Bad Request - Validation error",
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
};


const GetPresaleSetting2 = async (req, res) => {
    try {
        const records = await PresaleSchema2.find();

        return ({
            code: 200,
            message: 'Success - Get presale data',
            data: records,
        });
    } catch (error) {
        console.error("API Error:", error);
        if (error.name === "ValidationError") {
            return ({
                code: 400,
                message: "Bad Request - Validation error",
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
};

module.exports = {
    SetPresaleSetting,
    GetPresaleSetting2
};
