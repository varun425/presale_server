const { PriceSchema } = require("../modals/price");
const axios = require('axios');

const getEthPrice = async () => {
    try {
        const response = await axios.get(
            "https://api.etherscan.io/api?module=stats&action=ethprice&apikey="
        );
        return response.data.status === "1" ?
            Number(response.data.result.ethusd) :
            Number((await axios.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
            )).data.ethereum.usd);
    } catch (error) {
        console.error("Error fetching Ethereum price:", error);
        return null;
    }
};

const getBscPrice = async () => {
    try {
        const { data } = await axios.get(
            "https://api.diadata.org/v1/assetQuotation/BinanceSmartChain/0x0000000000000000000000000000000000000000"
        );
        return data.Price;
    } catch (error) {
        console.error("Error fetching Binance Smart Chain price:", error);
        return null;
    }
};

const SetPrice = async (req, res) => {
    try {
        const ethPrice = await getEthPrice();
        const bscPrice = await getBscPrice();

        if (ethPrice !== null && bscPrice !== null) {
            const filter = {}; // Empty filter to match any document
            const update = {
                ethPrice,
                bscPrice,
            };

            const options = {
                upsert: true, // Create a new document if no match is found
                new: true, // Return the updated document
            };

            const result = await PriceSchema.findOneAndUpdate(filter, update, options);
            console.log("API result for price", result);

            return {
                code: 200,
                message: 'Success - Saved price data ',
                data: result,
            };
        } else {
            return {
                code: 500,
                message: 'Internal Server Error - Unable to fetch price data',
            };
        }
    } catch (error) {
        console.error("API Error:", error);
        return {
            code: 500,
            message: 'Internal Server Error - An error occurred while processing your request',
            error: error.message,
        };
    }
};


// const GetPrice = async (req, res) => {
//     try {
//         const ethPrice = await getEthPrice();
//         const bscPrice = await getBscPrice();

//         if (ethPrice !== null && bscPrice !== null) {
//             return {
//                 code: 200,
//                 ETH_PRICE: ethPrice,
//                 BSC_PRICE: bscPrice,
//             };
//         } else {
//             return {
//                 code: 500,
//                 message: 'Internal Server Error - Unable to fetch price data',
//             };
//         }
//     } catch (error) {
//         console.error("API Error:", error);
//         return {
//             code: 500,
//             message: 'Internal Server Error - An error occurred while processing your request',
//             error: error.message,
//         };
//     }
// };
const GetPrice = async (req, res) => {
    try {
        const price = await PriceSchema.find();
        console.log("API resut for price", price);
        return {
            code: 200,
            message: 'Success - Get price data ',
            data: price,
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
    SetPrice,
    GetPrice,
};
