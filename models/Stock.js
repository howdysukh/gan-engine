const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({

    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    exchange: {
        type: String,
        enum: ["NSE", "BSE"],
        default: "NSE"
    },

    instrumentType: {
        type: String,
        default: "EQ"
    },

    sector: {
        type: String,
        default: ""
    },

    industry: {
        type: String,
        default: ""
    },

    currency: {
        type: String,
        default: "INR"
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {

    timestamps: true

});

stockSchema.index({
    symbol: "text",
    name: "text"
});

module.exports = mongoose.model("Stock", stockSchema);