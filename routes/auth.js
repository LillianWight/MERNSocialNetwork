const express = require("express");
const { signup } = require("../controllers/auth");
const router = express.Router();
/* const validator = require("../validators"); */

router.post("/signup", signup);
module.exports = router;
