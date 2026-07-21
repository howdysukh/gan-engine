const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    symbol: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    targetPrice: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        enum: ["SUPPORT", "RESISTANCE", "CUSTOM"],
        required: true
    },

    triggered: {
        type: Boolean,
        default: false
    },
    triggeredAt: {
    type: Date,
    default: null
},

seen: {
    type: Boolean,
    default: false
}

}, {
    timestamps: true
});

module.exports = mongoose.model("Alert", alertSchema);