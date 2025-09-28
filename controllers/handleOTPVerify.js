const User = require("../models/UserSchema");

// ✅ OTP Verification for Signup & Login
const handleOTPVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({ message: "No OTP found. Please request again." });
    }

    // ✅ Check if OTP is valid
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Check if OTP expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired. Please request again." });
    }

    // ✅ Mark OTP as verified and clear fields
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully!" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { handleOTPVerify };
