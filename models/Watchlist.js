const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    symbol: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },

    name: {
    type: String,
    default: ""
},

instrumentType: {
    type: String,
    default: "EQUITY"
},

    exchange: {
        type: String,
        default: "NSE"
    },

    monitoring: {

        enabled: {
            type: Boolean,
            default: true
        },

        engine: {
            type: String,
            default: "GANN"
        }

    },

    notifications: {

        browser: {
            type: Boolean,
            default: true
        },

        email: {
            type: Boolean,
            default: false
        }

    }

}, {

    timestamps: true

});

watchlistSchema.index(
    {
        userId: 1,
        symbol: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);

