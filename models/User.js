const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    provider:{

        type:String,

        enum:["guest","google"],

        required:true

    },

    guestId:{

        type:String,

        default:null

    },

    googleId:{

        type:String,

        default:null

    },

    name:{

        type:String,

        default:"Guest"

    },

    email:{

        type:String,

        default:null

    },

    photo:{

        type:String,

        default:null

    },

    preferences:{

        theme:{
            type:String,
            default:"dark"
        },

        notifications:{
            type:Boolean,
            default:true
        }

    }

},{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);