const {handleUserSignup} = require("../controllers/handleUserSignup");
const {handleUserLogin} = require("../controllers/handleUserLogin");
const express = require("express");

const router = express.Router();

router.post("/signup" , handleUserSignup);
router.post("/login" , handleUserLogin);


module.exports = router;