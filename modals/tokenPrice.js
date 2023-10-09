const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    tokenPrice: {
        type: Number,
        require:true
    },
    flag : {
        type : Number,
        default:0
    }

});
const TokenPriceSchema = mongoose.model("tokenprice", tokenSchema);
module.exports = {
    TokenPriceSchema
};