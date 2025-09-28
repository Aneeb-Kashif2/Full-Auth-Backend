const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../utils/otp");
const { sendEmail } = require("../utils/email");

const handleUserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered, go to Login" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const otp = generateOTP();

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
        });

        await sendEmail(email, "Verify your account", `Your OTP is: ${otp}`);

        return res.status(201).json({ message: "User created. Check your email for OTP to verify your account." });
    } catch (err) {
        console.error("Error during user signup ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifySignupOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return res.json({ message: "Account verified successfully!" });
    } catch (err) {
        console.error("Error verifying OTP", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { handleUserSignup, verifySignupOTP };
