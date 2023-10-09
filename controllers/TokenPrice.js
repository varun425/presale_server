const { TokenPriceSchema } = require("../modals/tokenPrice");

const TokenPrice = async (req, res) => {
    try {
        const { tokenPrice } = req.body;
        const flag = 1
        let existingTokenPrice = await TokenPriceSchema.findOne({ flag });

        if (!existingTokenPrice) {
            existingTokenPrice = new TokenPriceSchema({ tokenPrice, flag });
        } else {
            existingTokenPrice.tokenPrice = tokenPrice;
        }

        const result = await existingTokenPrice.save();

        return ({
            code: 200,
            message: existingTokenPrice.isNew
                ? 'Success - Saved tokenPrice data as a new record'
                : 'Success - Updated tokenPrice data',
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


const GetTokenPrice = async (req, res) => {
    try {
        const tokenPrices = await TokenPriceSchema.find();

        return ({
            code: 200,
            message: 'Success - Get tokenPrice data',
            data: tokenPrices,
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
    TokenPrice,
    GetTokenPrice,
};
