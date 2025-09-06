const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        reqruied : true,
    },
    email : {
        type : String,
        reqruied : true,
        unique : true,
    },
    password : {
        type : String,
        reqruied : true,
    },

});

const User = mongoose.model("User", UserSchema);

module.exports = User;