const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tierSchema = new Schema({
    tier1: {
        type: Number,
        required: true,

    },
    tier2: {
        type: Number,
        required: true,
    },
    flag: {
        type: Number,
        require: true,
        default: 0
    }

});
const TierSchema = mongoose.model("tier", tierSchema);
module.exports = {
    TierSchema
};                                                                         