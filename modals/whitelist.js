const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whitelistSchema = new Schema({
    network: { type: String },
    address: [

        {

            whitelistedAddress:
            {
                type: String,
                required: true,
            },

            bool: {
                type: Boolean,
                required: true,
            },
            tier: { type: Number, required: true },


        }
    ],
});

const WhitelistSchema = mongoose.model("whitelist", whitelistSchema);

module.exports = {
    WhitelistSchema
};
