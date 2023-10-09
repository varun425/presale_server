const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const presaleSchema2 = new Schema({
    tokenPrice: {
        type: Number,
        require:true
    },
    tier1: {
        type: Number,
        required: true,

    },
    tier2: {
        type: Number,
        required: true,
    },
    round: {
        type: Number,
        required: true,
    },
    investStatus: {
        type: Boolean,
        default: false,
        require:true
    },
    claimStatus: {
        type: Boolean,
        default: false,
        require:true
    },
    investStartsIn: {
        type: Date, // epoch seconds 
        default: 0,
        require: true
    },
    claimEndsIn: {
        type: Date, // epoch seconds 
        default: 0,
        require: true
    },
    flag: {
        type: Number,
        require: true,
        default: 0
    }

});
const PresaleSchema2 = mongoose.model("Setting", presaleSchema2);
module.exports = {
    PresaleSchema2
};