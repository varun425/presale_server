const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const investSchema = new Schema({
    investorAddress: {
        type: String,
        required: true,
        unique: true
    },
    totalInvestedAmount: { type: Number },
    data: [{
        txHash: { type: String, required: true },
        investedAmount: { type: Number, required: true },
        round: { type: Number, required: true },
        tier: { type: Number, required: true },
    }],
    claim: {
        claimAbleToken: { type: Number },
        isClaimed: { type: Boolean, default: false },
        claimedToken: { type: Number, default: Number(0) },
    }
});
const InvestSchema = mongoose.model("invest", investSchema);
module.exports = {
    InvestSchema
};