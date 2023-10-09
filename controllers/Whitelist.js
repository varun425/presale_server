// const { WhitelistSchema } = require("../modals/whitelist");

// const Whitelist = async (req, res) => {
//     try {
//         const { addresses } = req.body;

//         // Validate that all input addresses are valid Ethereum addresses
//         const validAddresses = addresses.list.filter(isValidEthereumAddress);
//         const network = addresses.network;
//         const tier = addresses.tier;
//         if (tier == 1) {
//             await handleTier(network, 1, validAddresses);

//         } else if (tier == 2) {
//             await handleTier(network, 2, validAddresses);

//         } else {

//         }


//         console.log("API result: Addresses added to the whitelist");
//         return {
//             code: 200,
//             message: "Success - Addresses added to the whitelist",
//         };
//     } catch (error) {
//         console.error("API Error:", error);
//         if (error.name === "ValidationError") {
//             return {
//                 code: 400,
//                 message: "Bad Request - Validation error",
//                 error: error.message,
//             };
//         } else {
//             return {
//                 code: 500,
//                 message: "Internal Server Error - An error occurred while processing your request",
//                 error: error.message,
//             };
//         }
//     }
// };

// // Function to validate Ethereum addresses
// function isValidEthereumAddress(address) {
//     return /^0x[0-9a-fA-F]{40}$/.test(address);
// }

// // Function to handle whitelisted addresses for a specific tier
// async function handleTier(network, tier, validAddresses) {
//     const result = await WhitelistSchema.findOneAndUpdate(
//         { network, "tiers.tier": tier },
//         {
//             $addToSet: { "tiers.list.whitelistedAddress": { $each: validAddresses } },
//             $set: { "tiers.list.bool": true }, // Set bool to true
//         },
//         { upsert: true, new: true }
//     );


// }

// const GetWhitelistedAddress = async (req, res) => {
//     try {
//         // const { addressToFetch } = req.params;
//         const addressToFetch = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
//         // Validate that the input address is a valid Ethereum address
//         if (!isValidEthereumAddress(addressToFetch)) {
//             return {
//                 code: 400,
//                 message: "Bad Request - Invalid Ethereum address",
//             };
//         }

//         const network = req.query.network; // Optionally filter by network

//         // Search for the address in all tiers
//         const foundRecords = await WhitelistSchema.find({
//             "tiers.list.whitelistedAddress": addressToFetch,
//             network: network || { $exists: true },
//         });

//         if (!foundRecords || foundRecords.length === 0) {
//             return {
//                 code: 404,
//                 message: "Address not found in any tier",
//             };
//         }

//         // You can choose how to handle multiple matches here, depending on your requirements
//         // For simplicity, we'll return the first match found
//         const matchedRecord = foundRecords[0];

//         return {
//             data: matchedRecord
//         };
//     } catch (error) {
//         console.error("API Error:", error);
//         return res.status(500).json({
//             code: 500,
//             message: "Internal Server Error - An error occurred while processing your request",
//             error: error.message,
//         });
//     }






// }




// // Function to check if an address is present in a specific tier of a network
// const checkAddressInTier = async (network, tier, address) => {
//   try {
//     const result = await WhitelistSchema.findOne({
//       network,
//       "tiers.tier": tier,
//       "tiers.list.whitelistedAddress": address.toString()
//     });

//     return result !== null;
//   } catch (error) {
//     console.error("Error checking address in tier:", error);
//     return false; // Handle errors as needed
//   }
// };

// // Function to check if an address is present in any tier of a network
// const checkAddressInTiers = async (network, address) => {
//   try {
//     const tier1Result = await checkAddressInTier(network, 1, address);
//     const tier2Result = await checkAddressInTier(network, 2, address);

//     // Add more tiers as needed

//     return tier1Result || tier2Result; // Return true if address is present in any tier
//   } catch (error) {
//     console.error("Error checking address in tiers:", error);
//     return false; // Handle errors as needed
//   }
// };

// // Example usage
// const addressToCheck = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
// const network = "poly";

// checkAddressInTiers(network, addressToCheck)
//   .then((isPresent) => {
//     if (isPresent) {
//       console.log(`Address ${addressToCheck} is present in one or more tiers.`);
//     } else {
//       console.log(`Address ${addressToCheck} is not present in any tier.`);
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// module.exports = {
//     Whitelist,
//     GetWhitelistedAddress,
//     checkAddressInTiers
// };
const { WhitelistSchema } = require("../modals/whitelist");

const csv = require("csv-parser");
const fs = require("fs");
const formidable = require('formidable'); // Import the formidable module


const Whitelist = async (req, res) => {
    try {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return ({
                    code: 400,
                    msg: "Problem with file upload"
                });
            }
            // Access the uploaded CSV file data from the 'files' object
            console.log(files);
            const csvFile = files.csvFile[0];
            if (!csvFile) {
                return ({
                    code: 400,
                    error: "CSV file is missing"
                });
            }

            // Now you can work with the 'csvFile' object, which contains file data
            const csvFilePath = csvFile.filepath;
            const csvData = [];

            // Use the 'csv-parser' library to parse the CSV file
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on("data", (row) => {
                    // Push each row of data from the CSV file to the 'csvData' array
                    csvData.push(row);
                })
                .on("end", async () => {
                    console.log("CSV Data:", csvData);

                    // Extract data from the CSV rows
                    const networks = [];
                    const addresses = [];
                    const bools = [];
                    const tiers = [];
                    csvData.forEach((row) => {
                        // Extract values from each row
                        const network = row['network'];
                        const whitelistedAddress = row['whitelistedAddress'];
                        const bool = row['bool'];
                        const tier = row['tier'];
                        // if (networks == undefined || networks == '' && whitelistedAddress == undefined || whitelistedAddress == '' && bool == undefined || bool == '' && tier == undefined || tier == '') {

                        // } else {
                        //     networks.push(network);
                        //     addresses.push(whitelistedAddress);
                        //     bools.push(bool);
                        //     tiers.push(tier);
                        // }
                        if (whitelistedAddress) {
                            networks.push('eth');
                            addresses.push(whitelistedAddress);
                            bools.push(bool);
                            tiers.push(tier);
                        }

                    });

                    try {
                        const savedRecords = await saveRecordsToDatabase(networks, addresses, bools, tiers);

                        return ({
                            code: 200,
                            data: savedRecords,
                            message: "Records saved to the database",
                        });
                    } catch (error) {
                        console.error("Database Error:", error);
                        return ({
                            code: 500,
                            data: error,
                            message: "Internal Server Error",
                        });
                    }
                });
        });
    } catch (error) {
        console.error("Controller Error:", error);
        return ({
            code: 500,
            data: error,
            message: "Internal Server Error",
        });
    }
};

async function saveRecordsToDatabase(networks, addresses, bools, tiers) {
    // Your database schema and save logic here
    // Check 'network' and handle accordingly
    // Return the saved record or any relevant response

    const ethNetwork = 'eth'; // Change this to match your network value

    const addressesArray = addresses.map((address, index) => ({
        whitelistedAddress: address,
        bool: bools[index] === 'true',
        tier: parseInt(tiers[index])
    }));

    if (networks[0] === ethNetwork) {
        // If the network is 'eth', find an existing record or create a new one
        const existingRecord = await WhitelistSchema.findOne({ network: ethNetwork });

        if (existingRecord) {
            // If an existing record is found, push unique addresses to it
            const uniqueAddresses = addressesArray.filter((newAddress) => {
                return !existingRecord.address.some((existingAddress) => {
                    return existingAddress.whitelistedAddress === newAddress.whitelistedAddress;
                });
            });

            if (uniqueAddresses.length > 0) {
                existingRecord.address.push(...uniqueAddresses);
                await existingRecord.save();
                return existingRecord;
            } else {
                return existingRecord; // No new addresses to add
            }
        } else {
            // If no existing record is found, create a new one
            const newRecord = new WhitelistSchema({
                network: ethNetwork,
                address: addressesArray
            });
            const savedRecord = await newRecord.save();
            return savedRecord;
        }
    } else {
        // For networks other than 'eth', create a new record
        const newRecord = new WhitelistSchema({
            network: networks[0],
            address: addressesArray
        });
        const savedRecord = await newRecord.save();
        return savedRecord;
    }
}


const GetWhitelistedAddress = async (req, res) => {
    try {
        const { network, address } = req.query
        const record = await WhitelistSchema.findOne({ network, 'address.whitelistedAddress': address });
        if (!record) {
            return ({
                code: 404,
                data: null,
                message: "Record not found",
            });
        }
        let isAddressWhitelisted = false;
        for (const item of record.address) {
            if (item.whitelistedAddress === address) {
                isAddressWhitelisted = true;
                break;
            }
        }

        if (isAddressWhitelisted) {
            console.log("Address is whitelisted");
            return ({
                code: 200,
                data: true,
            });
        } else {
            console.log("Address is not whitelisted");
            return ({
                code: 200,
                data: false,
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
    Whitelist,
    GetWhitelistedAddress,
};