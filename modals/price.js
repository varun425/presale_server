const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    ethPrice: {
        type: Number,
    },
    bscPrice: {
        type: Number,
    },

});
const PriceSchema = mongoose.model("price", priceSchema);
module.exports = {
    PriceSchema
};