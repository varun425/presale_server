const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roundSchema = new Schema({
    round: {
        type: Number,
        required: true,
    },
    flag: {
        type: Number,
        require: true,
        default: 0
    }

});
const RoundSchema = mongoose.model("round", roundSchema);
module.exports = {
    RoundSchema
};