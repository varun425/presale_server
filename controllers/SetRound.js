const { RoundSchema } = require("../modals/round");
const SetRound = async (req, res) => {
    try {
        const { round } = req.body;
        const flag = 1
        let existingRecords = await RoundSchema.findOne({ flag });

        if (!existingRecords) {
            existingRecords = new RoundSchema({ round, flag });
        } else {
            existingRecords.round = round;
        }

        const result = await existingRecords.save();

        return ({
            code: 200,
            message: existingRecords.isNew
                ? 'Success - Saved round data as a new record'
                : 'Success - Updated round data',
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
}
const GetRound = async (req, res) => {
    try {
        const round = await RoundSchema.find();
        console.log("API resut for round", round);
        return {
            code: 200,
            message: 'Success - Get round data ',
            data: round,
        };
    } catch (error) {
        console.error("API Error:", error);
        if (error.name === "ValidationError") {
            return {
                code: 400,
                message: "Bad Request - Validation error",
                error: error.message,
            };
        } else {
            return {
                code: 500,
                message: 'Internal Server Error - An error occurred while processing your request',
                error: error.message,
            };
        }
    }

}
module.exports = {
    SetRound,
    GetRound
};

