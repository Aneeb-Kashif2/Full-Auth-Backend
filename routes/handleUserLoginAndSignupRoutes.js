const { handleUserSignup } = require("../controllers/handleUserSignup");
const { handleUserLogin, verifyLoginOTP } = require("../controllers/handleUserLogin");
const { handleOTPVerify } = require("../controllers/handleOTPVerify");
const express = require("express");

const router = express.Router();

// Signup (step 1: create user, send OTP)
router.post("/signup", handleUserSignup);

// Signup OTP verification (step 2)
router.post("/signup/verify-otp", handleOTPVerify);

router.post("/login", handleUserLogin);

// ✅ Login OTP verification (step 2)
router.post("/login/verify-otp", verifyLoginOTP);

module.exports = router;
