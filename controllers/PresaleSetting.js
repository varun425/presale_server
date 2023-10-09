const { PresaleSchema } = require("../modals/presaleSetting");

const PresaleSetting = async (req, res) => {
    try {

        let { investStatus, claimStatus, investStartsIn, claimEndsIn } = req.body;
        if (investStatus == null && claimStatus == null) {
            investStatus = false
            claimStatus = false
        }
        const flag = 1

        let existingRecord = await PresaleSchema.findOne({ flag });

        if (!existingRecord) {

            existingRecord = new PresaleSchema({ investStatus, claimStatus, investStartsIn, claimEndsIn, flag });

        } else {

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


const GetPresaleSetting = async (req, res) => {
    try {
        const records = await PresaleSchema.find();

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
    PresaleSetting,
    GetPresaleSetting,
};
