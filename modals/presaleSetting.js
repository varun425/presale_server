const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const presaleSchema = new Schema({
    investStatus: {
        type: Boolean,
        default: false,
        require: true
    },
    claimStatus: {
        type: Boolean,
        default: false,
        require: true
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
const PresaleSchema = mongoose.model("presaleSetting", presaleSchema);
module.exports = {
    PresaleSchema
};