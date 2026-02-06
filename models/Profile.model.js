// mongoose
const { MongoOIDCError, ExplainVerbosity } = require("mongodb");
const mongoose = require("mongoose");
// schema
const profileSchema = new mongoose.Schema({
    // fields
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        // required : true
    },

    headline : {
        type : String,
        // required : true
    },
    summary : {
        type : String,
        // required : true
    },
    experience : [{
        companyName : {
            type : String,
            // required : true
        },
        joiningDate : String,
        LastDate : String,
        description : String
    }],


    skills : [{
        type : String,
        // required : true
    }],

    education : [{
       schoolName : String,
       session : String,
    }],


},
// timestamps -> will tell the time user was stored and 
// also them time user was last updated
{
    timestamps : true
})
// model
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile