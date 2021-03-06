const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const router = express.Router();
const { userSignupValidator } = require("../validators");

router.post("/signup", userSignupValidator, signup);
module.exports = router;
router.post("/signin", signin);
router.get("/signout", signout);
