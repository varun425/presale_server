const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spamSchema = new Schema({
    address : {type : String,require:true},
    totalSpamAmount:{type:Number},
    tx:[
        {
            network:{type:String},
            txHash:{type:String},
            amount:{type:Number},
        }
    ]
});
const SpamSchema = mongoose.model("spam", spamSchema);
module.exports = {
    SpamSchema
};