// mongoose
const mongoose = require("mongoose");
// schema
const userSchema = new mongoose.Schema({
    // fields
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    lastLogin : {
        type : Date
    }
},
// timestamps -> will tell the time user was stored and 
// also them time user was last updated
{
    timestamps : true
})
// model
const User = mongoose.model("User", userSchema);

module.exports = User