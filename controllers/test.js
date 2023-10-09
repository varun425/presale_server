const { WhitelistSchema } = require("../modals/whitelist");

// Create a new record
const createRecord = async (req, res) => {
    try {
        const { network, address } = req.body;

        // Check if a record with the same network exists
        let existingRecord = await WhitelistSchema.findOne({ network });

        if (existingRecord) {
            // If the record exists, filter out addresses that are already in the array
            const uniqueAddresses = address.filter((newAddr) => {
                return !existingRecord.address.includes(newAddr);
            });

            if (uniqueAddresses.length > 0) {
                // If there are new unique addresses, add them to the existing record
                existingRecord.address = existingRecord.address.concat(uniqueAddresses);
                await existingRecord.save();
                return {
                    code: 200,
                    data: existingRecord,
                    message: "Record updated with new addresses",
                };
            } else {
                // No new unique addresses to add
                return {
                    code: 200,
                    data: existingRecord,
                    message: "No new addresses to add",
                };
            }
        } else {
            // If the record does not exist, create a new one
            const newRecord = new WhitelistSchema({
                network,
                address,
            });
            const savedRecord = await newRecord.save();
            return {
                code: 200,
                data: savedRecord,
                message: "Record created",
            };
        }
    } catch (error) {
        console.error("Controller Error:", error);
        return {
            code: 500,
            data: error,
            message: "Internal Server Error",
        };
    }
};

// Get a single record by ID
const getRecordById = async (req, res) => {
    try {
        const network = "eth";
        const address = "0x8b80805b94286abb973cc0cdfe13d0e9f88dc394";

        // Find the record by network and address
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
                break; // Address found, no need to continue the loop
            }
        }

        if (isAddressWhitelisted) {
            // Address is in the whitelistedAddress array
            console.log("Address is whitelisted");
            return ({
                code: 200,
                data: true,
            });
        } else {
            // Address is not in the whitelistedAddress array
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


// Get all records
const getAllRecords = async (req, res) => {
    try {
        const records = await WhitelistSchema.find();
        return {
            code: 200,
            data: records
        }
    } catch (error) {
        console.error("Controller Error:", error);
        return {
            code: 500,
            data: error
        }
    }
};

// Update a record by ID
// const updateRecordById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { network, address } = req.body;
//         const updatedRecord = await WhitelistSchema.findByIdAndUpdate(
//             id,
//             { network, address },
//             { new: true }
//         );
//         if (!updatedRecord) {
//             return res.status(404).json({ error: "Record not found" });
//         }
//         return res.json(updatedRecord);
//     } catch (error) {
//         console.error("Controller Error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// // Delete a record by ID
// const deleteRecordById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedRecord = await WhitelistSchema.findByIdAndRemove(id);
//         if (!deletedRecord) {
//             return res.status(404).json({ error: "Record not found" });
//         }
//         return res.json(deletedRecord);
//     } catch (error) {
//         console.error("Controller Error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

module.exports = {
    createRecord,
    getRecordById,
    getAllRecords,
    // updateRecordById,
    // deleteRecordById,
};
