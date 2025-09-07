const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");


const handleUserLogin = async (req , res) =>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email}).select("+password");
        if(!user){
           return res.status(400).json({message : "Invalid email"});
        }
        const comparePassword = await bcrypt.compare(password , user.password);
        if(!comparePassword) {
            return res.status(400).json({message : "Invalid email"});
        }

        const token = jwt.sign({
            id : user._id , email : user.email  // Every MongoDb document has a unique _id we make it simple by just giving it name of id and all other same 
        },
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    )

    res.status(200).json({
        message : "Login Successful" ,
        token ,
        user : {id : user._id , name : user.name , email :user.email}
    });
    }
    catch(err){
        console.error(err);
    res.status(500).json({ message: "Server error" });

    }
}

module.exports = {
    handleUserLogin
}