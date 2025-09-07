const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const handleUserSignup = async (req , res) =>{
    try {
        const {name , email , password} = await req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "Email already registered go to Login"});
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = await User.create({name , email , password : hashedPassword});
        return res.status(201).json({message : "User created", User : newUser});
    }
    catch(err){
        console.error("Error during user signup ", err);
        return res.status(500).json({message : "Internal Server Error"});
    }

}
module.exports = {handleUserSignup}